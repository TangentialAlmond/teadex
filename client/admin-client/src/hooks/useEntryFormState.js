import { useState } from "react"
import toast from "react-hot-toast"

const MAX_FILE_SIZE_MB = 5 
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

// The initial blank state for creation, mirroring the EntryForm structure
const initialEntryState = {
  name: "",
  teaType: "",
  country: "",
  regions: "",
  altitudeMeters: null,
  coordinates: { latitude: null, longitude: null },
  cultivar: "",
  harvestingTime: "",
  harvestingMethod: "",
  cultivationProcess: "",
  productionSteps: [], // Array
  farm: "",
  farmer: "",
  merchant: "",
  notes: "",
  imageUrl: "",
}

/**
 * Custom hook to manage form state and change handlers for EntryForm.
 * It includes client-side file validation (size and type).
 * @param {object} initialData - Data to pre-populate the form (for editing).
 */
export const useEntryFormState = (initialData) => {
  // Use initialData if provided (for edit), otherwise use the blank state
  const [entry, setEntry] = useState(initialData || initialEntryState)
  const [file, setFile] = useState(null)

  // --- Core Handlers ---

  /**
   * Safely loads external data (e.g. from an API) into the state.
   * It merges the incoming data with initialEntryState to ensure nested 
   * structures like 'coordinates' are preserved.
   */
  const loadEntryData = (data) => {
    setEntry({
      ...initialEntryState,
      ...data,
      coordinates: {
        ...initialEntryState.coordinates,
        ...(data.coordinates || {})
      }
    })
  }
  
  // Handles changes for text/select/number inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Handle Nested Field Names (e.g., "coordinates.latitude")
    if (name.includes('.')) {
        // Split the name (e.g., ["coordinates", "latitude"])
        const [parent, child] = name.split('.') 
        
        // Update the state using the setter function
        setEntry(prev => ({
            ...prev,
            [parent]: {
                ...(prev[parent] || {}), // Ensure parent exists before spreading
                [child]: value // Update the specific child field
            }
        }))

    } else {
        // Handle simple top-level fields (e.g., "altitudeMeters")
        setEntry(prev => ({
            ...prev,
            [name]: value
        }))
    }
}

  // Handles file selection and client-side validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    
    if (!selectedFile) {
      setFile(null)
      return
    }

    // --- File Type Check ---
    const acceptedTypes = ["image/jpg", "image/jpeg", "image/png"]
    if (!acceptedTypes.includes(selectedFile.type)) {
      toast.error("Invalid file type. Only JPEG, JPG, and PNG are accepted.")
      e.target.value = null // Clear the input
      setFile(null)
      return
    }

    // --- File Size Check (5 MB Max) ---
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File size must not exceed ${MAX_FILE_SIZE_MB}MB.`)
      e.target.value = null // Clear the input
      setFile(null)
      return
    }
    
    setFile(selectedFile)
  }
  
  // --- Return Values ---
  return {
    entry,
    setEntry, 
    loadEntryData, // Added to support clean data loading in Edit mode
    file,
    setFile, // Useful if you need to clear the file state externally
    handleChange,
    handleFileChange,
  }
}