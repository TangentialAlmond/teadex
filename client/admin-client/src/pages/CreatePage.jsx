import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import api from "../lib/axios"
import EntryForm from "../components/EntryForm/EntryForm"
import { validateCoreEntryFields, validateOriginAndGeographyFields } from "../lib/utils"
import { useEntryFormState } from "../hooks/useEntryFormState"

const CreatePage = () => {
  const navigate = useNavigate()

  // Use Hook to manage all form state and handlers
  const { 
    entry, 
    file, 
    handleChange, 
    handleFileChange 
  } = useEntryFormState()
  
  // --- Submission (POST Request) ---
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Core validation check
    const missingFields = validateCoreEntryFields(entry, file)
    if (missingFields.length > 0) {
      const errorMessage = `The following is/are required to create a new entry: ${missingFields.join(', ')}.`
      toast.error(errorMessage, { duration: 10000 })
      return
    }

    // Validation check for the numeric fields for Origin & Geography fields
    const numericErrors = validateOriginAndGeographyFields(entry)
    if (numericErrors.length > 0) {
        // Display all specific numeric errors as individual toasts
        numericErrors.forEach(message => {
            toast.error(message, { duration: 10000 })
        })
        return
    }
    
    const formData = new FormData()
    formData.append("image", file) // Image is required for new entries

    // Standardize to single JSON payload for all text fields
    formData.append('data', JSON.stringify(entry))

    console.log(entry)

    // Loop over the entry object and append each key/value pair
    for (const key in entry) {
      const value = entry[key]
      
      // Handle coordinates (or other nested objects) by stringifying them
      if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value))
      } else {
        // Append simple strings/numbers/nulls
        formData.append(key, value)
      }
    }

    try {

      // Create new entry
      const res = await api.post(
        "/entries", 
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      toast.success("New entry created!")

      // Navigate to the detail page of the new entry
      navigate(`/entry/${res.data._id}/view`)

    } catch (error) {
      console.error("Creation failed:", error.response?.data || error)
      if (error.response.status === 429) {
        toast.error("Hold your horses. You've made too many requests.")
      } else {
        toast.error("Failed to create entry. Please try again later.")
      }
    }
  }

  return (
    <div className="min-h-screen pt-10 bg-base-300">

      {/* Pass blank state, set isEditing true, and pass POST handlers */}
      <EntryForm 
        entry={entry} 
        isEditing={true}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
      />
    </div>
  )
}

export default CreatePage