import express from "express"

// Import the Multer middleware configuration for S3
import upload from "../config/s3Multer.js" 

// Import controllers
import { 
    createEntry, 
    deleteEntry, 
    getAllEntries, 
    getEntryById, 
    updateEntry 
} from "../controllers/entryControllers.js"

const router = express.Router()

// --- GET (No change, no file upload) ---
router.get("/", getAllEntries)
router.get("/:id", getEntryById)

// --- POST (Create Entry) ---
// 1. Multer middleware runs first: upload.single('image')
//    - It intercepts the file data using the 'image' field name.
//    - It uploads the file to S3.
//    - It populates req.body with form fields and req.file.location with the S3 URL.
// 2. createEntry controller runs next, accessing req.body and req.file.location.
router.post(
    "/", 
    upload.single("image"),
    createEntry
)

// --- PUT (Update Entry) ---
// 1. Multer runs first: If a new file is provided, it uploads it to S3.
// 2. updateEntry controller runs next, determining if it should use 
//    req.file.location (new image) or req.body.imageUrl (old image).
router.put(
    "/:id", 
    upload.single("image"),
    updateEntry
)

// --- DELETE (No change, no file upload) ---
router.delete("/:id", deleteEntry)

export default router