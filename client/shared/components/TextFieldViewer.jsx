// --- Render a field for viewing text input ---
const TextFieldViewer = ({ 
    label, 
    field, 
    entry
}) => {
    
    // Assuming text fields are primarily top-level, access directly
    const rawValue = entry[field]
    const displayValue = rawValue ?? ''

    return (
        <div className="flex justify-between py-2 border-b border-base-300">
            <span className="font-semibold text-gray-500">{label}:</span>
            <span className="text-base-content text-right">
                {displayValue || <span className="opacity-50">N/A</span>}
            </span>
        </div>
    )
}

export default TextFieldViewer