import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import api from "../lib/axios"
import EntryForm from "../components/EntryForm/EntryForm"
import NotFoundPage from "../../../shared/pages/NotFoundPage"

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
        } else if (error.response?.status !== 404) {
          toast.error("Failed to fetch data for editing. Please try again later.")
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
      <NotFoundPage />
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