import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import entryRoutes from "./routes/entryRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

// Configure to read environment file
dotenv.config()

// Grab PORT from .env and 5001 if PORT not defined
const PORT = process.env.PORT || 5001

// Create app using the express framework
const app = express()

// Set app to trust proxies for IP of request to be retrieved
// instead of using the IP from the load balancer/proxy like Render/Netlify
app.set("trust proxy", 1)

// Middleware to handle CORS
app.use(cors({
    origin: "http://localhost:5173"
}))

// Express middleware which enables reading req.body by the controllers
app.use(express.json())

// Ratelimiter middleware
app.use(rateLimiter)

// Route commands via the api link to entryRoutes
app.use("/api/entries", entryRoutes)

// Connect to the database and then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
})