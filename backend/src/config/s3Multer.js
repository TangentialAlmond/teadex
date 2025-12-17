import dotenv from "dotenv"
import multer from "multer"
import multerS3 from "multer-s3"
import { S3Client } from "@aws-sdk/client-s3"
import { generateUniqueKey } from "../utils/generateUniqueKey.js"

// Configure to read environment file
dotenv.config()

// Max image file size (Note: Must match client/hook value)
const MAX_FILE_SIZE_MB = 5
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

// --- S3 Client Configuration (Consolidated) ---
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

// S3 Bucket Name
const bucketName = process.env.AWS_BUCKET_NAME

// --- Configure Multer-S3 Storage Engine ---
const s3Storage = multerS3({
    s3: s3Client,
    bucket: bucketName,
    acl: "public-read", 
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname, originalName: file.originalname })
    },
    key: (req, file, cb) => {
        // Use the centralized key generation logic
        const fileKey = generateUniqueKey(file.originalname)
        
        // Extract extension from the mimetype safely
        const fileExtension = file.mimetype.split('/')[1] || 'bin' 
        
        // Construct the full path (e.g., "tea-entries/entry_1700000_tea.jpeg")
        const fileName = `tea-entries/${fileKey}.${fileExtension}`
        
        cb(null, fileName) 
    }
})

// --- Configure Multer Instance ---
const upload = multer({ 
    storage: s3Storage,
    limits: { 
        fileSize: MAX_FILE_SIZE_BYTES 
    },
    fileFilter: (req, file, cb) => {
        // This function's ONLY job is to validate the file type
        if (
            file.mimetype === "image/jpeg" || 
            file.mimetype === "image/png" || 
            file.mimetype === "image/jpg"
        ) {
            cb(null, true) // Accept file
        } else {
            cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'), false) 
        }
    }
})

export default upload