// NOTE: Remember to add `s3:DeleteObject` permission to your IAM policy for
// DeleteObjectCommand to run.
import dotenv from "dotenv"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"
dotenv.config()

// --- S3 Configuration (Same as in config/s3Multer.js) ---
export const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

export const bucketName = process.env.AWS_BUCKET_NAME

// --- New Deletion Service Function ---
export async function deleteFileFromS3(fileKey) {
    if (!fileKey) {
        console.warn("Attempted to delete file with null or undefined key.")
        return
    }
    
    // Create the command to delete the object
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
    })

    try {
        const response = await s3Client.send(command)
        console.log(`Successfully deleted S3 object: ${fileKey}`, response)
        return response
    } catch (error) {
        // Log the error but do NOT crash the server. 
        // A failed delete (e.g., file didn't exist) should not halt the transaction.
        console.error(`Error deleting S3 object ${fileKey}:`, error)
        throw error
    }
}