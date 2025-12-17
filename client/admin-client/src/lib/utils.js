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
export const validateOriginAndGeographyFields = (entry) => {
    const errors = []

    // --- Define Fields and Constraints ---
    
    // Constraints match your Mongoose schema
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
            key: 'coordinates.latitude', 
            min: -90, 
            max: 90, 
            value: entry.coordinates.latitude 
        },
        { 
            name: "Longitude", 
            key: 'coordinates.longitude', 
            min: -180, 
            max: 180, 
            value: entry.coordinates.longitude 
        },
    ]

    // --- Validation Loop ---

    for (const field of numericFields) {
        const { name, min, max, value } = field
        
        // Handle empty fields (they are optional, so an empty string is allowed)
        if (value === "" || value === null) {
            continue // Valid because they are optional
        }

        // --- Check 1: Must be a number (float) ---
        
        // parseFloat will convert valid numeric strings.
        // If the input is something like "123a" or just "-" or ".", it will return NaN.
        const numValue = parseFloat(value)

        if (isNaN(numValue) || !isFinite(numValue)) {
            // Note: We use the range limits in the error message for clarity
            errors.push(`${name} must be a number between ${min} and ${max}`)
            continue
        }

        // --- Check 2: Must be within the acceptable range ---
        
        if (numValue < min || numValue > max) {
            errors.push(`${name} must be between ${min} and ${max}`)
        }
    }

    // --- Handle Coordinate Pair Completeness (Custom Check) ---

    // Find the Latitude and Longitude objects from the loop results
    const latField = numericFields.find(f => f.key === 'coordinates.latitude')
    const longField = numericFields.find(f => f.key === 'coordinates.longitude')

    console.log("Validation check", latField, longField)
    
    // Check if one coordinate is present but the other is missing
    const latPresent = latField.value !== "" && latField.value !== null
    const longPresent = longField.value !== "" && longField.value !== null

    if ((latPresent && !longPresent) || (!latPresent && longPresent)) {
        errors.push("If coordinates are provided, both Latitude and Longitude must be entered.")
    }

    return errors
}