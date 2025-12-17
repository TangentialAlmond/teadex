const SelectViewer = ({ 
  label, 
  field,
  entry
}) => {
  
  const value = entry[field]

  return (
        <div className="flex justify-between py-2 border-b border-base-300">
        <span className="font-semibold text-gray-500">{label}:</span>
        <span className="text-base-content text-right">
            {value || <span className="opacity-50">N/A</span>}
        </span>
        </div>
    )
}

export default SelectViewer