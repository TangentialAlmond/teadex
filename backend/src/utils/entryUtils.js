/**
 * Helper to convert common empty/invalid string representations to actual null.
 * This is crucial for Mongoose schema fields expecting Number, Date, or Enum 
 * where an empty string ("") or "null" string will cause a cast failure.
 */
const cleanField = (value) => {
    if (value === null || value === undefined) {
        return null;
    }
    const strValue = String(value).trim();
    
    // Check for empty string, string "null", or string "undefined"
    if (strValue === "" || strValue.toLowerCase() === "null" ||
        strValue.toLowerCase() === "undefined") {
        return null;
    }
    return value;
}

// Define the keys that should be processed by cleanField.
// This list should match all non-nested, non-array fields in your schema.
const FIELD_KEYS_TO_CLEAN = [
    "name", "teaType", "ingredients", "cultivar", "altitudeMeters", 
    "cultivationProcess", "harvestingTime", "harvestingMethod", "country", 
    "regions", "farm", "farmer", "merchant", "notes"
];

/**
 * Maps incoming request data to the Mongoose Entry schema structure.
 * @param {object} body - req.body containing text fields.
 * @param {string | null} imageUrl - The S3 URL or null.
 * @returns {object} - The prepared data object for Mongoose.
 */
export function prepareEntryData(body, imageUrl) {
    
    // --- Clean Primitive Fields Dynamically ---
    const entryData = {};
    
    // Loop over the predefined keys and apply the cleaning function
    FIELD_KEYS_TO_CLEAN.forEach(key => {
        entryData[key] = cleanField(body[key]);
    });
    
    // Set the imageUrl separately
    entryData.imageUrl = imageUrl;

    // --- Handle Nested Coordinates (Parse and Clean) ---
    let coordinates = body.coordinates;
    
    // Parse JSON string if necessary (comes from client FormData)
    if (typeof coordinates === "string") {
        try {
            coordinates = JSON.parse(coordinates);
        } catch (e) {
            coordinates = null;
        }
    }
    
    if (coordinates) {
        // Clean nested latitude/longitude fields
        coordinates.latitude = cleanField(coordinates.latitude);
        coordinates.longitude = cleanField(coordinates.longitude);
        
        // If both are null after cleaning, set coordinates to null 
        // so Mongoose doesn't try to validate an empty object.
        if (coordinates.latitude === null && coordinates.longitude === null) {
            coordinates = null;
        }
    }
    entryData.coordinates = coordinates;

    // --- Handle productionSteps (Parse Array) ---
    let productionSteps = body.productionSteps;
    
    // Parse JSON array string if necessary
    if (typeof productionSteps === 'string') {
        try {
            productionSteps = JSON.parse(productionSteps);
        } catch (e) {
            productionSteps = [];
        }
    }
    entryData.productionSteps = productionSteps || [];

    // --- Final Construction and Return ---
    return entryData;
}