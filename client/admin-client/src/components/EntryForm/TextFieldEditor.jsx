// --- Render a field accepting text input ---
const TextFieldEditor = ({ 
    label, 
    field, 
    type = 'text', 
    required = false, 
    rows = 1,
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
                </span>
            </label>
            {type === 'textarea' ? (
                <textarea 
                    name={field}
                    value={displayValue}
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
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder={`Enter ${label}`}
                />
            )}
        </div>
    )
}

export default TextFieldEditor