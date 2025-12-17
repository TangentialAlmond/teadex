import Entry from "../models/Entry.js"
import { prepareEntryData } from "../utils/entryUtils.js"
import { deleteFileFromS3 } from "../services/s3Service.js"

export async function getAllEntries(_, res) {
    try {
        const entries = await Entry.find()
        res.status(200).json(entries)
    } catch (error) {
        console.error("Error in getAllEntries controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getEntryById(req, res) {
    try {
        const entry = await Entry.findById(req.params.id)
        if(!entry) {
            return res.status(404).json({message: "Entry not found"})
        }
        res.status(200).json(entry)
    } catch (error) {
        console.error("Error in getEntryById controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function createEntry(req, res) {

    try {
        // --- STEP 1: Handle Image URL from Multer-S3 ---
        let imageUrl = null
        
        if (req.file) {
            // Production/Dev: Multer-S3 has uploaded the file and set the URL
            imageUrl = req.file.location 
        } else if (process.env.NODE_ENV !== "production") {
            // Development ONLY: Use placeholder if no file provided
            // NOTE: Placeholder URL should match your client-side check
            imageUrl = `PATH/TO/PLACEHOLDER/DEV_ENTRY_${Date.now()}.png`
        } else {
            // Production: No file provided, fail gracefully
            return res.status(400).json({
                message: "Image file is required to create a new entry." 
            })
        }
        
        // --- STEP 2: Prepare and Validate Data ----

        // Check if data was sent as a JSON string under the key 'data'
        // (from client FormData) and format into JSON object
        let bodyData = req.body
        if (req.body.data) {
            try {
                // Overwrite the body with the parsed JSON object
                bodyData = JSON.parse(req.body.data); 
            } catch (e) {
                console.error("Failed to parse JSON string in req.body.data:", e)
                return res.status(400).json({ message: "Invalid JSON data provided." })
            }
        }
        
        // Use the utility to map all fields cleanly
        const entryData = prepareEntryData(bodyData, imageUrl)

        // Create the new entry using the prepared data
        const newEntry = new Entry(entryData)
        await newEntry.save()

        // --- STEP 3: Return the Created Resource ---
        return res.status(201).json(newEntry)
        
    } catch (error) {
        // Handle Validation Errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message)
            return res.status(400).json({
                message: "Validation failed: " + messages.join(', ')
            })
        }
        
        console.error("Error in createEntry controller:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateEntry(req, res) {
    try {
        // --- STEP 1: Parse data ---

        // Check if data was sent as a JSON string under the key 'data'
        // (from client FormData) and format into JSON object
        let bodyData = req.body
        if (req.body.data) {
            try {
                // Overwrite the body with the parsed JSON object
                bodyData = JSON.parse(req.body.data); 
            } catch (e) {
                console.error("Failed to parse JSON string in req.body.data:", e)
                return res.status(400).json({ message: "Invalid JSON data provided." })
            }
        }

        // --- STEP 2: Determine final image URL and delete old S3 image ---
        // Get the old image URL from the submitted form data (which is the current DB value)
        const oldImageUrl = bodyData.imageUrl;
        let finalImageUrl = oldImageUrl // Start with the old URL

        // If Multer-S3 uploaded a new file:
        if (req.file && req.file.location) {
            
            // a) Delete the old image from S3 (if it exists and isn't a placeholder)
            if (oldImageUrl && !oldImageUrl.includes("PLACEHOLDER")) {
                
                // Use new URL(string) to get the necessary pathname property
                const url = new URL(oldImageUrl)
                const oldS3Key = url.pathname.slice(1)
                
                // If deletion fails (S3 error), execution jumps to the outer catch block.
                await deleteFileFromS3(oldS3Key)
            }

            // b) Update the final URL to the new S3 URL
            finalImageUrl = req.file.location
        }
        
        // --- STEP 3: Prepare and Validate Data ---
        
        // Use the utility to map all fields cleanly
        const updateData = prepareEntryData(bodyData, finalImageUrl)

        // Find and Update the document
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,
            updateData, 
            { new: true, runValidators: true } // runValidators ensures Mongoose schema rules are checked
        )

        if(!updatedEntry) {
            return res.status(404).json({message: "Entry not found"})
        }

        res.status(200).json(updatedEntry)
        
    } catch (error) {
        // Handle Validation Errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message)
            return res.status(400).json({
                message: "Validation failed: " + messages.join(', ')
            })
        }
        
        console.error("Error in updateEntry controller:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteEntry(req, res) {
    try {

        // Get the entry to delete
        const entryId = req.params.id
        const entryToDelete = await Entry.findById(entryId)
        
        if (!entryToDelete) {
            return res.status(404).json({ message: "Entry not found" })
        }
        
        const imageUrl = entryToDelete.imageUrl

        // Delete the image from the AWS S3 bucket 
        if (imageUrl && !imageUrl.includes("PLACEHOLDER")) {
            
            const url = new URL(imageUrl)
            const s3Key = url.pathname.slice(1)
            
            // If this line fails (S3 error), execution jumps to the outer catch block.
            await deleteFileFromS3(s3Key) 
        }

        // Delete the Mongoose document
        // (Only runs if S3 deletion succeeded or was skipped)
        await entryToDelete.deleteOne()

        // Success response
        return res.status(200).json({ message: "Entry deleted successfully" })
        
    } catch (error) {
        // This catch handles S3 errors, Database errors, and URL parsing errors.
        console.error("Error in deleteEntry controller:", error)
        
        // You can add more specific logic here if you want to differentiate
        // between S3 and DB errors, but a 500 is often sufficient.
        return res.status(500).json({ message: "Internal server error during deletion." })
    }
}