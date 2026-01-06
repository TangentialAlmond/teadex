import dotenv from "dotenv"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Allow ratelimiter to access .env
dotenv.config()

// Create a ratelimiter that allows 500 requests per 5 min
// Note: I tried typing "15 min" instead of "15 m", which seems
// to cause some kind of error.
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(1000, "5 m")
})

export default ratelimit