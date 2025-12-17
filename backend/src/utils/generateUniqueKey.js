import { v4 as uuidv4 } from "uuid"

/**
 * Generates a unique key using a UUID (v4) and includes the original
 * file extension for proper typing.
 * @param {string} originalFilename - The original name of the file.
 * @returns {string} The final unique path (e.g., "entry/<UUID>.jpg")
 */
export function generateUniqueKey(originalFilename) {
    // Generate a UUID (e.g., "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890")
    const uniqueId = uuidv4() 

    // Extract the file extension (e.g., .jpg, .png) by getting the last element
    // after splitting the originalFilename by "."
    const fileExtension = originalFilename.split('.').pop()
    
    // Final Key format: entry/a1b2c3d4-e5f6...jpg
    return `entry/${uniqueId}`
}