// Function: Formats the date for display in NoteCard.js
export function formatDate(date) {
  const dateObject = new Date(date)
  return dateObject.toLocaleDateString(
      "en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
      }
  )
}

/**
 * Checks for missing required core fields.
 * The file is required only if entry.imageUrl is missing or empty.
 * @param {object} entry The current form state object.
 * @param {File | null} file The file object (for image upload).
 * @returns {Array<string>} An array of user-friendly names of missing fields.
 */
export const validateCoreEntryFields = (entry, file) => {
  const requiredChecks = [
    { 
      field: 'image file', 
      // Valid if a new file is uploaded OR an existing imageUrl exists
      isValid: !!file || !!entry.imageUrl 
    },
    { 
      field: 'tea name', 
      isValid: !!entry.name && entry.name.trim() !== "" 
    },
    { 
      field: 'tea type', 
      isValid: !!entry.teaType && entry.teaType.trim() !== "" 
    },
  ]

  const missingFields = requiredChecks
    .filter(check => !check.isValid)
    .map(check => check.field)

  return missingFields
}

/**
 * Check if the fields expecting numeric input are valid (Altitude, Latitude, Longitude).
 * @param {object} entry The current form state object, where these fields are stored as strings.
 * @returns {Array<string>} An array of error messages for invalid fields.
 */
// shared/lib/utils.js
export const validateOriginAndGeographyFields = (entry) => {
    const errors = []
    
    // Safely extract coordinates with defaults to prevent crashes
    const coords = entry.coordinates || {}
    const lat = coords.latitude
    const lng = coords.longitude

    const numericFields = [
        { 
            name: "Altitude (meters)", 
            key: 'altitudeMeters', 
            min: 0, 
            max: 8000, 
            value: entry.altitudeMeters 
        },
        { 
            name: "Latitude", 
            key: 'latitude', 
            min: -90, 
            max: 90, 
            value: lat 
        },
        { 
            name: "Longitude", 
            key: 'longitude', 
            min: -180, 
            max: 180, 
            value: lng 
        },
    ]

    for (const field of numericFields) {
        const { name, min, max, value } = field
        
        // A field is "Empty" if it is null, undefined, or an empty string
        const isEmpty = value === "" || value === null || value === undefined

        if (isEmpty) {
            continue
        }

        const numValue = parseFloat(value)

        if (isNaN(numValue) || !isFinite(numValue)) {
            errors.push(`${name} must be a number`)
            continue
        }

        if (numValue < min || numValue > max) {
            errors.push(`${name} must be between ${min} and ${max}`)
        }
    }

    // --- Revised Coordinate Pair Check ---
    const latEmpty = lat === "" || lat === null || lat === undefined
    const lngEmpty = lng === "" || lng === null || lng === undefined

    // If one is filled and the other isn't, throw error
    if (!latEmpty && lngEmpty) {
        errors.push("Longitude is required if Latitude is provided")
    }
    if (latEmpty && !lngEmpty) {
        errors.push("Latitude is required if Longitude is provided")
    }

    return errors
}