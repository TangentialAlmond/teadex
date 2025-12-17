import toast from "react-hot-toast"
import { ClockFading, Eye, PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link, useNavigate } from "react-router"
import api from "../lib/axios"

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

  // Handles Edit button click
  const handleEditClick = async (e) => {
    e.preventDefault()
    // Navigate to the edit page
    navigate(`${entryUrl}/edit`) 
  }

  // Handles Delete button click
  const handleDeleteClick = async (e) => {
    e.preventDefault()

    // Check if user wishes to delete the entry
    if (!window.confirm("Are you sure you want to delete this entry?")) return

    // Delete the entry entirely including the image associated from
    // MongoDB and the AWS S3 bucket
    try {
      const id = entry._id
      await api.delete(`/entries/${id}`)
      setEntries((prev) => prev.filter(entry => entry._id !== id))
      toast.success("Entry deleted successfully!")
      navigate("/")
    } catch (error) {
      toast.error("Failed to delete entry.")
      console.log("Error in handleDeleteClick", error)
    }
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
            
            {/* Edit Button */}
            <button 
              className="btn btn-ghost btn-xs text-info" 
              onClick={handleEditClick}
            >
              <PenSquareIcon className="size-4" />
            </button>
            
            {/* Delete Button */}
            <button className="btn btn-ghost btn-xs text-error" onClick={handleDeleteClick}>
              <Trash2Icon className="size-4" />
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