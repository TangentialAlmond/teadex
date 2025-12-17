import { Eye } from "lucide-react"
import { Link, useNavigate } from "react-router"

const EntryCard = ({ entry, setEntries }) => {
  const navigate = useNavigate()
  const entryUrl = `/entry/${entry._id}`

  // Helper to check if the URL is a placeholder (only happens in DEV)
  const isPlaceholder = entry.imageUrl && entry.imageUrl.startsWith("PATH/TO/PLACEHOLDER")

  // --- Handlers for Inner Buttons ---
  // Note: All buttons prevent Link navigation and then navigate programmatically
  
  // Handles View button click
  const handleViewClick = async (e) => {
    e.preventDefault()
    // Navigate to the view page
    navigate(`${entryUrl}/view`)
  }

  return (
    // Outer Link (wraps the whole card, linking to the view page)
    <Link to={`${entryUrl}/view`} // The main link for the whole card
      className="card bg-base-200 hover:shadow-lg transition-all duration-200"
    >
      <div className="card-body p-4 space-y-3">
        
        {/* Title and Buttons Container */}
        <h3 className="card-title text-base-content justify-between">
          
          {/* Entry Name and Badge Container (Left Side) */}
          <div className="flex flex-col items-start"> 
            
            {/* Entry Name */}
            <span className="font-semibold">{entry.name}</span>

            {/* Tea Type Badge (appears below name) */}
            <div className="badge badge-neutral badge-outline badge-sm mt-1"> 
              {entry.teaType}
            </div>
          </div>

          {/* Action Buttons (Right Side) */}
          <div className="flex items-center gap-1"> 
            
            {/* View Button */}
            <button className="btn btn-ghost btn-xs" onClick={handleViewClick}>
              <Eye className="size-4" />
            </button>
            
          </div>
          
        </h3>

        {/* Image Display */}
        <figure className="bg-white rounded-lg p-2 shadow-sm">
          <img 
            src={entry.imageUrl} 
            alt={`Image of ${entry.name}`} 
            className={`w-full h-40 object-cover rounded-md 
                        ${isPlaceholder ? 'opacity-50' : ''}`}
          />
        </figure>
        
      </div>
    </Link>
  )
}

export default EntryCard