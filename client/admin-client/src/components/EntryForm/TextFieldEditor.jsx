// --- Render a field accepting text input ---
const TextFieldEditor = ({ 
    label, 
    field,
    type = 'text', 
    required = false, 
    rows = 1,
    charLimit = 500,  // Default character limit of 500
    showCharLimit = true,
    entry,
    handleChange
}) => {
    
    // Assuming text fields are primarily top-level, access directly
    const rawValue = entry[field]
    const displayValue = rawValue ?? ''

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">
                    {label} {required && <span className="text-error">*</span>}
                    {showCharLimit && <span className="ml-1 text-sm text-gray-400">(max {charLimit} characters)</span>}
                </span>
            </label>
            {type === 'textarea' ? (
                <textarea 
                    name={field}
                    value={displayValue}
                    maxLength={charLimit}
                    onChange={handleChange}
                    rows={rows}
                    className="textarea textarea-bordered h-24"
                    placeholder={`Enter ${label}`}
                />
            ) : (
                <input 
                    type={type}
                    name={field}
                    value={displayValue}
                    maxLength={charLimit}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder={`Enter ${label}`}
                />
            )}
        </div>
    )
}

export default TextFieldEditor