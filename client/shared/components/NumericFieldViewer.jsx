import { getNestedValue } from "../lib/utils"

// --- Render a field accepting a range of numeric values ---
const NumericFieldViewer = ({
    label,
    field,
    entry
}) => {
    
    // Safely get the value (handles altitudeMeters OR coordinates.latitude)
    const rawValue = getNestedValue(entry, field)
    
    // Ensure the value prop is always a string for input type="number"
    const displayValue = rawValue === null || rawValue === undefined ? '' : String(rawValue)

    return (
        <div className="flex justify-between py-2 border-b border-base-300">
            <span className="font-semibold text-gray-500">{label}:</span>
            <span className="text-base-content text-right">
                {displayValue || <span className="opacity-50">N/A</span>}
            </span>
        </div>
    )
}

export default NumericFieldViewer