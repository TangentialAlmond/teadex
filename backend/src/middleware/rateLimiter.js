import ratelimit from "../config/upstash.js"


const rateLimiter = async (req, res, next) => {
    try {

        // Get IP of requester
        // Note: Express must be configured to trust proxies 
        // via app.set("trust proxy", 1)
        const clientIp = req.ip

        // Check if IP address of requester is within rate limit
        const {success} = await ratelimit.limit(clientIp)

        // 429 Error for too many requests
        if(!success) {
            return res.status(429).json({message: "Too many requests, Please try again later."})
        }

        // Run the next function i.e. application runs as expected
        next()

    } catch (error) {
        console.log("Rate limit error", error)
        next(error)
    }
}

export default rateLimiter