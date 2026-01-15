import { Info } from "lucide-react"

const Disclaimer = () => {
  return (
    /* flex: Enables flexbox 
       justify-center: Centers the badge horizontally
    */
    <div className="mx-auto max-w-6xl p-4 flex justify-center">
      <div className="badge badge-default badge-outline h-auto py-2 text-center text-sm italic">
        <span>
          <strong>Disclaimer:</strong> Entries may contain errors as the TeaDex data is manually curated.
        </span>
      </div>
    </div>
  )
}

export default Disclaimer