import { Link } from "react-router"
import { Coffee } from "lucide-react"

const NotFoundPage = () => {
  return (
    // min-h-[70vh] ensures it's centered in the viewport
    <div className="min-h-[70vh] flex items-center justify-center max-w-6xl mx-auto px-4">
      <div className="bg-base-200 border border-base-300 rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl">
        <div className="flex flex-col md:flex-row items-center p-8 gap-8">
          
          {/* Icon Container with a "pulsing" or "faded" effect */}
          <div className="flex-shrink-0 bg-primary/10 p-6 rounded-full">
            <Coffee className="size-16 text-primary animate-pulse" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="text-primary font-mono font-bold tracking-widest uppercase text-sm">
              Error 404
            </span>
            <h1 className="text-3xl font-bold mt-1 mb-3">This cup is empty.</h1>
            <p className="text-base-content/70 mb-6">
              The page you are looking for hasn't been brewed yet.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link to="/" className="btn btn-primary px-8">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage