import { useState, useCallback } from "react"
import toast from "react-hot-toast"

const MAX_FILE_SIZE_MB = 5 
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

// The initial blank state for creation, mirroring the EntryForm structure.
// Using empty strings instead of null for numeric/text fields ensures
// that React form inputs remain "controlled".
const initialEntryState = {
    name: "",
    teaType: "",
    country: "",
    regions: "",
    altitudeMeters: "",
    coordinates: { latitude: "", longitude: "" },
    cultivar: "",
    harvestingTime: "",
    harvestingMethod: "",
    cultivationProcess: "",
    productionSteps: [],
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
    /**
     * Helper to clean incoming data. If a field is missing or null in 
     * the database, it falls back to the initial blank state values.
     */
    const sanitizeData = (data) => {
        if (!data) return initialEntryState
        return {
            ...initialEntryState,
            ...data,
            // Ensure coordinates is an object even if DB returns null
            coordinates: {
                latitude: data.coordinates?.latitude ?? "",
                longitude: data.coordinates?.longitude ?? ""
            },
            // Fallback for optional numeric fields to keep inputs controlled
            altitudeMeters: data.altitudeMeters ?? ""
        }
    }

    // Initialize state with sanitized data
    const [entry, setEntry] = useState(sanitizeData(initialData))
    const [file, setFile] = useState(null)

    // --- Core Handlers ---

    /**
     * Safely loads external data (e.g. from an API) into the state.
     * It uses the same sanitization logic to prevent UI crashes.
     */
    const loadEntryData = useCallback((data) => {
        setEntry(sanitizeData(data))
    }, [])  // Empty array means "only create this function once"
  
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
                    // Spread safely: if parent is null in state, use empty object
                    ...(prev[parent] || {}), 
                    [child]: value 
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
        loadEntryData, 
        file,
        setFile, 
        handleChange,
        handleFileChange,
    }
}