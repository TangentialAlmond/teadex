// Field for viewing the production steps
const ProductionStepsViewer = ({ steps }) => {
  
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

  return <StepListView />
}

export default ProductionStepsViewer