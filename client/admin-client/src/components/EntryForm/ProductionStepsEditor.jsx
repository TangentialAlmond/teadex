// Field for editing the production steps
const ProductionStepsEditor = ({ steps, allSteps }) => {
  
  const StepListView = () => (
    <ul className="steps steps-vertical w-full bg-base-200 p-4 rounded-lg">
      {steps.length > 0 ? (
        steps.map((step, index) => (
          <li 
            key={index} 
            data-content={index + 1} 
            className="step step-primary"
          >
            {step}
          </li>
        ))
      ) : (
        <li 
          className="step w-full text-center text-gray-500"
        >
          No steps recorded.
        </li>
      )}
    </ul>
  )

  return (
    <div className="space-y-4">
      <div className="alert alert-info shadow-lg text-sm">
        To manage steps, select options from the dropdown, then 
        manually reorder by dragging/re-entering if needed.
      </div>
      
      <select multiple className="select select-bordered w-full h-40">
        {allSteps.map(step => (
          <option key={step} value={step}>{step}</option>
        ))}
      </select>
      <small className="text-xs text-gray-500 mt-1">
        A multi-select library is recommended here.
      </small>

      <StepListView />
    </div>
  )
}

export default ProductionStepsEditor