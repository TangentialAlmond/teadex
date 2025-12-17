import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import api from "../lib/axios"
import EntryForm from "../components/EntryForm/EntryForm"

const EntryViewPage = () => {
  const { id } = useParams()
  const [entry, setEntry] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/entries/${id}`)
        setEntry(res.data)
        console.log("Successfully fetched entry data:", res.data)
      } catch (error) {
        console.error("Error fetching entry:", error)
        if (error.response.status === 429) {
          toast.error(("Hold your horses. You're trying to view too many entries."))
        } else {
          toast.error("Failed to load tea entry. Please try again later.")
        }
        setEntry(null) // Ensure state is null on error
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading entry details...</div>
  }
  
  if (!entry) {
    return (
      <div className="text-center mt-20 p-4">
        <h2 className="text-2xl text-error">Entry Not Found</h2>
        <p className="mt-2">
          The requested tea entry could not be loaded.
        </p>
        <Link to="/" className="btn btn-primary mt-4">
          Go Back Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-10 bg-base-300">
      {/* Pass the fetched data and set isEditing to false */}
      <EntryForm 
        entry={entry} 
        isEditing={false}
      />
    </div>
  )
}

export default EntryViewPage