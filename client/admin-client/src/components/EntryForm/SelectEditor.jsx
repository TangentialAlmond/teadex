const SelectEditor = ({ 
  label, 
  field, 
  options, 
  required = false,
  entry,
  handleChange
}) => {
  
  const value = entry[field]

  return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">
            {label} {required && <span className="text-error">*</span>}
          </span>
        </label>
        <select
          name={field}
          value={value || ''}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option value="" disabled>Select {label}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    )
}

export default SelectEditor