import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import api from "../lib/axios"
import EntryForm from "../components/EntryForm/EntryForm"
import { validateCoreEntryFields, validateOriginAndGeographyFields } from "../lib/utils"
import { useEntryFormState } from "../hooks/useEntryFormState"
import NotFoundPage from "../../../shared/pages/NotFoundPage"

const EntryEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  /// Initialize hook without data yet
  const { 
    entry, 
    loadEntryData, // Used to load fetched data
    file, 
    handleChange, 
    handleFileChange 
  } = useEntryFormState() 

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/entries/${id}`)
        loadEntryData(res.data)
      } catch (error) {
        if (error.response.status === 429) {
          toast.error("Hold your horses. You've made too many requests.")
        } else if (error.response?.status !== 404) {
          toast.error("Failed to fetch data for editing. Please try again later.")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, loadEntryData])

  // Handles form submission (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Core validation check
    const missingFields = validateCoreEntryFields(entry, file)
    if (missingFields.length > 0) {
      const errorMessage = `The following is/are required to create a new entry: ${missingFields.join(', ')}.`
      toast.error(errorMessage, { duration: 5000 })
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
    
    // Append image file if a new one was selected
    if (file) {
      formData.append('image', file)
    }
    
    // Append all entry data (JSON must be stringified for FormData)
    formData.append('data', JSON.stringify(entry)) 

    try {

      // Update the entry
      await api.put(
        `entries/${id}`, 
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      toast.success('Entry updated successfully!')

      // Redirect to view page
      navigate(`/entry/${id}/view`)

    } catch (error) {
      console.error("Update failed:", error.response?.data || error)
      if (error.response.status === 429) {
          toast.error("Hold your horses. You've made too many requests.")
        } else {
          toast.error("Failed to update entry. Please try again later.")
        }
    }
  }

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading editor...</div>
  }

  // entry is a truthy object owing to how useEntryFormState.js
  // is defined. As such, the only way to check if the entry is
  // non-exixtent in the database is to catch a missing ID.
  if (!entry._id) {
    return <NotFoundPage />
  }
  
  return (
    <div className="min-h-screen pt-10 bg-base-300">

      {/* Pass state, set isEditing true, and pass handlers */}
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

export default EntryEditPage