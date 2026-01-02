import mongoose from "mongoose"
import countryList from "country-list" // For standardized list of countries

// --- CONSTANTS AND ENUMERATIONS ---
const TEA_TYPES = [
    "white", "green", "black", "yellow", "oolong",
    "dark", "tisane/non-camellia sinensis"
]
const HARVEST_METHODS = [
    "handpicked", "tea scissors", "handheld-machine",
    "driven harvestor", "others (please specify in notes)"
]
const COUNTRIES = countryList.getNames() // Load the full list of country names
const PRODUCTION_STEPS = [
    "withering", "kill green", "bruising", "oxidation",
    "rolling", "shaping", "drying", "yellowing",
    "fermenting", "others (please specify in notes)"
]

const entrySchema = new mongoose.Schema({

    // --- REQUIRED FIELDS ---

    // AWS Link (Set by server after S3 upload)
    imageUrl: {
        type: String,
        required: [true, "Image URL is required."],
        unique: true, // Ensures unique file path
    },

    // Name of the tea
    name: {
        type: String,
        required: [true, "Tea name is required."],
        trim: true,
        maxlength: 100
    },

    // Type of Tea (Fixed list/Enum)
    teaType: {
        type: String,
        required: [true, "Tea type is required."],
        enum: {
            values: TEA_TYPES,
            message: '{VALUE} is not a valid tea type.'
        },
    },

    // --- OPTIONAL FIELDS ---

    // Ingredients
    ingredients: { type: String, trim: true },

    // Camellia sinensis cultivar used
    cultivar: { type: String, trim: true },

    // Altitude of tea field in meters
    altitudeMeters: { 
        type: Number, 
        min: 0, 
        max: 8000, 
    },

    // Cultivation process
    cultivationProcess: { type: String, trim: true },

    // Harvesting time (Month and Year)
    harvestingTime: { type: String, trim: true },

    // Harvesting method (Fixed list/Enum)
    harvestingMethod: {
        type: String,
        enum: HARVEST_METHODS,
    },
    
    // Country of production (Standardized list)
    country: {
        type: String,
        enum: COUNTRIES, // Uses the imported country-list array
    },

    // Region(s) of production
    regions: { type: String, trim: true },

    // Coordinates of tea field (Specific Format)
    coordinates: {
        type: { // Define the schema as an object type
            latitude: { type: Number, min: -90, max: 90 },
            longitude: { type: Number, min: -180, max: 180 },
        },
        // --- Custom validation logic ---
        validate: {
            validator: function(v) {  // v is the coordinates object

                // If coordinates object is NOT provided (v is null/undefined),
                // it's OK (since it's optional).
                if (!v) {
                    return true
                }
                
                // If coordinates IS provided,
                // BOTH latitude and longitude MUST be present and valid.
                const latValid = typeof v.latitude === 'number' &&
                    v.latitude >= -90 &&
                    v.latitude <= 90
                const longValid = typeof v.longitude === 'number' &&
                    v.longitude >= -180 &&
                    v.longitude <= 180

                // Return true only if BOTH are valid, otherwise return false
                return latValid && longValid
            },
            message: "Coordinates must have Latitude (±90) and Longitude (±180)."
        },
        // Ensures the field is null/undefined if not provided
        default: undefined
    },
    
    // Production steps (Select Multiple/Array of Enums)
    productionSteps: [{
        type: String,
        enum: PRODUCTION_STEPS,
    }],

    // Other entities
    farm: { type: String, trim: true },
    farmer: { type: String, trim: true },
    merchant: { type: String, trim: true },

    // Notes (500 character limit)
    notes: { 
        type: String, 
        maxlength: 500
    }

}, { timestamps: true }) // Automatically adds createdAt and updatedAt fields

// Create a model based on the defined schema
const Entry = mongoose.model("Entry", entrySchema)
export default Entry