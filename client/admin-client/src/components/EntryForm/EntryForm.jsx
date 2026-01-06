import { Link } from "react-router"

// Import constants
import { TEA_TYPES, HARVEST_METHODS, COUNTRIES,
  PRODUCTION_STEPS } from "./EntryForm.constants"

// Import renderers
import { TextFieldRenderer, NumericFieldRenderer, SelectRenderer,
  ProductionStepsRenderer } from "./EntryForm.helpers"

// --- MAIN FORM RENDER ---
const EntryForm = ({ entry, isEditing, handleChange, handleSubmit, 
                     handleFileChange }) => {
  
  // Determine if the URL is a placeholder
  const isPlaceholder = entry.imageUrl && 
                        entry.imageUrl.startsWith("PATH/TO/PLACEHOLDER")

  // The form action depends on the mode
  const formAction = isEditing ? handleSubmit : (e) => e.preventDefault()
  
  return (
    <div 
      className="max-w-4xl mx-auto p-6 md:p-10 bg-base-100 shadow-2xl 
                 rounded-xl"
    >
      
      {/* Conditional Title and Back Button */}
      <div className="mb-8">
        <Link to="/" className="btn btn-ghost btn-sm mb-4">
          ← Back to Entries
        </Link>
        <h1 className="text-4xl font-extrabold text-primary text-center">
          {isEditing ? `Edit: ${entry.name || 'New Entry'}` : entry.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- IMAGE & NOTES COLUMN (1/3 Width) --- */}
        <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold border-b pb-2">
                Image & Notes
            </h2>
          
            {/* Image View/Upload */}
            <div className="relative bg-white p-2 rounded-lg shadow-md">
                <img 
                    src={entry.imageUrl || '/placeholder.png'} 
                    alt={`Image of ${entry.name}`}
                    className={`w-full h-48 object-cover rounded-md 
                                ${isPlaceholder ? 'opacity-50' : ''}`}
                />
                {/* Upload Field for Edit Mode */}
                {isEditing && (
                    <div className="mt-3 form-control">
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            className="file-input file-input-bordered file-input-sm 
                                         w-full"
                            accept="image/*"
                        />
                        <small className="text-xs text-gray-500 mt-1">
                            Select an image to upload/replace the current one.
                        </small>
                    </div>
                )}
            </div>
          
            {/* Notes Field (TextArea) */}
            <TextFieldRenderer label="Notes" field="notes" type="textarea" 
                               rows={5} 
                               entry={entry} isEditing={isEditing} 
                               handleChange={handleChange} /> 
        </div>
        
        {/* --- PRIMARY DATA COLUMNS (2/3 Width) --- */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={formAction} className="space-y-6">
            
            {/* --- Required Fields --- */}
            <h2 className="text-xl font-bold border-b pb-2 text-primary">
                Core Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextFieldRenderer label="Tea Name" field="name" 
                                   required={true} showCharLimit={false}
                                   entry={entry} isEditing={isEditing} 
                                   handleChange={handleChange} />
                <SelectRenderer label="Tea Type" field="teaType" 
                                options={TEA_TYPES} required={true} 
                                entry={entry} isEditing={isEditing} 
                                handleChange={handleChange} />
            </div>
            
            {/* --- Geography --- */}
            <h2 className="text-xl font-bold border-b pb-2 mt-6">
                Origin & Geography
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectRenderer label="Country" field="country" 
                                options={COUNTRIES} 
                                entry={entry} isEditing={isEditing} 
                                handleChange={handleChange} />
                <TextFieldRenderer label="Region(s)" field="regions"
                                   showCharLimit={false} 
                                   entry={entry} isEditing={isEditing} 
                                   handleChange={handleChange} />
                                   
                {/* NUMERIC FIELD: Altitude with min/max constraints */}
                <NumericFieldRenderer label="Altitude (meters)" 
                                      field="altitudeMeters" 
                                      entry={entry} isEditing={isEditing} 
                                      handleChange={handleChange}
                                      min={0}
                                      max={8000} />
              
                {/* Coordinates */}
                <div className="col-span-full grid grid-cols-2 gap-4">
                    {/* NUMERIC FIELD: Latitude with min/max constraints */}
                    <NumericFieldRenderer label="Latitude (±90)" 
                                          field="coordinates.latitude" 
                                          entry={entry} isEditing={isEditing} 
                                          handleChange={handleChange}
                                          min={-90}
                                          max={90} />
                    {/* NUMERIC FIELD: Longitude with min/max constraints */}
                    <NumericFieldRenderer label="Longitude (±180)" 
                                          field="coordinates.longitude" 
                                          entry={entry} isEditing={isEditing} 
                                          handleChange={handleChange}
                                          min={-180}
                                          max={180} />
                </div>
            </div>
            
            {/* --- Harvesting & Processing --- */}
            <h2 className="text-xl font-bold border-b pb-2 mt-6">
                Cultivation & Harvesting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextFieldRenderer label="Cultivar" field="cultivar"
                                   showCharLimit={false} 
                                   entry={entry} isEditing={isEditing} 
                                   handleChange={handleChange} />
                <TextFieldRenderer label="Cultivation Process" 
                                   field="cultivationProcess"
                                   showCharLimit={false}
                                   entry={entry} isEditing={isEditing} 
                                   handleChange={handleChange} />
                <TextFieldRenderer label="Harvesting Time" 
                                   field="harvestingTime"
                                   showCharLimit={false}
                                   entry={entry} isEditing={isEditing} 
                                   handleChange={handleChange} />
                <SelectRenderer label="Harvesting Method" 
                                field="harvestingMethod"
                                options={HARVEST_METHODS} 
                                entry={entry} isEditing={isEditing} 
                                handleChange={handleChange} />
            </div>

            {/* --- PRODUCTION STEPS --- */}
            <h2 className="text-xl font-bold border-b pb-2 mt-6">
                Production Steps (Ordered)
            </h2>
            <ProductionStepsRenderer 
                isEditing={isEditing} 
                steps={entry.productionSteps || []} 
                allSteps={PRODUCTION_STEPS} 
            />


            {/* --- Entities --- */}
            <h2 className="text-xl font-bold border-b pb-2 mt-6">
                Entities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextFieldRenderer label="Farm" field="farm"
                                   showCharLimit={false}
                                   entry={entry} isEditing={isEditing} 
                                   handleChange={handleChange} />
                <TextFieldRenderer label="Farmer" field="farmer"
                                   showCharLimit={false}
                                   entry={entry} isEditing={isEditing} 
                                   handleChange={handleChange} />
                <TextFieldRenderer label="Merchant" field="merchant" 
                                   showCharLimit={false}
                                   entry={entry} isEditing={isEditing} 
                                   handleChange={handleChange} />
            </div>
            
            {/* --- Submission Button --- */}
            {isEditing && (
                <div className="pt-8">
                    <button type="submit" 
                            className="btn btn-lg btn-success w-full">
                        {entry._id ? "Update Entry" : "Create Entry"}
                    </button>
                </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default EntryForm