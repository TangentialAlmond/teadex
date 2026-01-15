import {ZapIcon} from "lucide-react"

const RateLimitedUI = () => {
  return (
    // min-h-[70vh] ensures it's centered in the viewport
    <div className="min-h-[70vh] flex items-center justify-center max-w-6xl mx-auto px-4">
      <div className="bg-base-200 border border-base-300 rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl">
        <div className="flex flex-col md:flex-row items-center p-8 gap-8">
          
          {/* Icon Container */}
          <div className="flex-shrink-0 bg-primary/10 p-6 rounded-full">
            <ZapIcon className="size-10 text-primary" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="text-primary font-mono font-bold tracking-widest uppercase text-sm">
              Error 429
            </span>
            <h1 className="text-3xl font-bold mt-1 mb-3">Too many brews!</h1>
            <p className="text-base-content/70 mb-6">
              You've made too many requests in a short period. Please wait a moment.
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RateLimitedUI