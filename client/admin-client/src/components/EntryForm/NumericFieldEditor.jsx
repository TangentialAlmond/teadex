import { getNestedValue } from "../../../../shared/lib/utils"

// --- Render a field accepting a range of numeric values ---
const NumericFieldEditor = ({
    label,
    field,
    required = false,
    min,
    max,
    step = "any",
    entry,
    handleChange
}) => {
    
    // Safely get the value (handles altitudeMeters OR coordinates.latitude)
    const rawValue = getNestedValue(entry, field)
    
    // Ensure the value prop is always a string for input type="number"
    const displayValue = rawValue === null || rawValue === undefined ? '' : String(rawValue)

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">
                    {label} {required && <span className="text-error">*</span>}
                    {(min !== undefined || max !== undefined) && (
                        <span className="ml-2 text-sm text-gray-400">
                            ({min !== undefined ? min : ''} to {max !== undefined ? max : ''})
                        </span>
                    )}
                </span>
            </label>
            <input 
                type="number" 
                name={field}
                value={displayValue} 
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder={`Enter ${label}`}
                min={min} 
                max={max}
                step={step}
            />
        </div>
    )
}

export default NumericFieldEditor