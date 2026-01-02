// Script for updating all entries with teaType "fermented" to teaType "dark"

import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import Entry from "../src/models/Entry.js" // Adjust path to your model

// Resolve the path to the backend directory where this server.js is found
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(__dirname)

// Configure to read the environment file
dotenv.config({ path: path.join(__dirname, "../.env") })

// Print the MONGO_URI to check that the environment file is being read
console.log(process.env.MONGO_URI)

// Update the entries with type "fermented" to "dark"
const migrate = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to DB for migration...')

        const result = await Entry.updateMany(
            { teaType: 'fermented' },
            { $set: { teaType: 'dark' } }
        )

        console.log(`Success: ${result.modifiedCount} entries updated`)
        process.exit(0)
    } catch (error) {
        console.error('Migration failed:', error)
        process.exit(1)
    }
}

migrate()