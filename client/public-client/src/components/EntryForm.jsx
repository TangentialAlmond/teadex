import { Link } from "react-router"
import NumericFieldViewer  from "../../../shared/components/NumericFieldViewer"
import TextFieldViewer from "../../../shared/components/TextFieldViewer"
import SelectViewer from "../../../shared/components/SelectViewer"
import ProductionStepsViewer from "../../../shared/components/ProductionStepsViewer"

// --- MAIN VIEW RENDER ---
const EntryForm = ({ entry }) => {
  
  // Determine if the URL is a placeholder
  const isPlaceholder = entry.imageUrl && 
                        entry.imageUrl.startsWith("PATH/TO/PLACEHOLDER")

  return (
    <div 
      className="max-w-4xl mx-auto p-6 md:p-10 bg-base-100 shadow-2xl 
                 rounded-xl"
    >
      
      {/* Back Button and Dynamic Title */}
      <div className="mb-8">
        <Link to="/" className="btn btn-ghost btn-sm mb-4">
          ← Back to Entries
        </Link>
        <h1 className="text-4xl font-extrabold text-primary text-center">
          {entry.name || "Untitled Entry"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- IMAGE & NOTES COLUMN (1/3 Width) --- */}
        <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold border-b pb-2">
                Image & Notes
            </h2>
          
            {/* Image View */}
            <div className="relative bg-white p-2 rounded-lg shadow-md">
                <img 
                    src={entry.imageUrl || '/placeholder.png'} 
                    alt={`Image of ${entry.name}`}
                    className={`w-full h-48 object-cover rounded-md 
                                ${isPlaceholder ? 'opacity-50' : ''}`}
                />
            </div>
          
            {/* Notes Field (Read-only) */}
            <TextFieldViewer label="Notes" field="notes"
                               entry={entry} /> 
        </div>
        
        {/* --- PRIMARY DATA COLUMNS (2/3 Width) --- */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* --- Required Fields --- */}
            <h2 className="text-xl font-bold border-b pb-2 text-primary">
                Core Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextFieldViewer label="Tea Name" field="name" entry={entry} />
                <SelectViewer label="Tea Type" field="teaType" entry={entry} />
            </div>
            
            {/* --- Geography --- */}
            <h2 className="text-xl font-bold border-b pb-2 mt-6">
                Origin & Geography
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectViewer label="Country" field="country" entry={entry} />
                <TextFieldViewer label="Region(s)" field="regions" 
                                   entry={entry} />
                                   
                {/* NUMERIC FIELD: Altitude display */}
                <NumericFieldViewer label="Altitude (meters)" 
                                      field="altitudeMeters" 
                                      entry={entry} />
              
                {/* Coordinates */}
                <div className="col-span-full grid grid-cols-2 gap-4">
                    {/* NUMERIC FIELD: Latitude display */}
                    <NumericFieldViewer label="Latitude" 
                                          field="coordinates.latitude" 
                                          entry={entry} />
                    {/* NUMERIC FIELD: Longitude display */}
                    <NumericFieldViewer label="Longitude" 
                                          field="coordinates.longitude" 
                                          entry={entry} />
                </div>
            </div>
            
            {/* --- Harvesting & Processing --- */}
            <h2 className="text-xl font-bold border-b pb-2 mt-6">
                Cultivation & Harvesting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextFieldViewer label="Cultivar" field="cultivar" 
                                   entry={entry} />
                <TextFieldViewer label="Cultivation Process" 
                                   field="cultivationProcess" 
                                   entry={entry} />
                <TextFieldViewer label="Harvesting Time" 
                                   field="harvestingTime" 
                                   entry={entry} />
                <SelectViewer label="Harvesting Method" 
                                field="harvestingMethod"
                                entry={entry} />
            </div>

            {/* --- PRODUCTION STEPS --- */}
            <h2 className="text-xl font-bold border-b pb-2 mt-6">
                Production Steps (Ordered)
            </h2>
            <ProductionStepsViewer
                steps={entry.productionSteps || []}
            />

            {/* --- Entities --- */}
            <h2 className="text-xl font-bold border-b pb-2 mt-6">
                Entities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextFieldViewer label="Farm" field="farm" 
                                   entry={entry} />
                <TextFieldViewer label="Farmer" field="farmer" 
                                   entry={entry} />
                <TextFieldViewer label="Merchant" field="merchant" 
                                   entry={entry} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default EntryForm