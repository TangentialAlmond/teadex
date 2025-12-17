import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

import entryRoutes from "./routes/entryRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
import { fileURLToPath } from "url"

// Grab PORT from .env and 5001 if PORT not defined
const PORT = process.env.PORT || 5001

// Create app using the express framework
const app = express()

// Resolve the path to the backend directory where this server.js is found
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure to read the environment file
dotenv.config({ path: path.join(__dirname, ".env") })

// Set app to trust proxies for IP of request to be retrieved
// instead of using the IP from the load balancer/proxy like Render/Netlify
app.set("trust proxy", 1)

// Middleware to handle CORS
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}

// Express middleware which enables reading req.body by the controllers
app.use(express.json())

// Ratelimiter middleware
app.use(rateLimiter)

// Route commands via the api link to entryRoutes
app.use("/api/entries", entryRoutes)

// Serve the optimized public-client under the same localhost
if (process.env.NODE_ENV === "production") {
    const distPath = path.join(
        __dirname,
        "..", "..", "client", "public-client", "dist"
    )
    app.use(express.static(distPath))
    app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"))
    })
}

// Connect to the database and then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
})