import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import api from "../lib/axios"
import Navbar from "../components/Navbar"
import EntryCard from "../components/EntryCard"
import RateLimitedUI from "../components/RateLimitedUI"

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await api.get("/entries")
        console.log(res.data)
        setEntries(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching entries")
        if (error.response.status === 429) {
          setIsRateLimited(true)
          toast.error("Hold your horses. You've made too many requests.")
        } else {
          toast.error("Error loading entries. Please try again later.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  return (
    <div className="min-h-screen">

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary-content py-10">Loading entries...</div> }

        {entries.length > 0 && !isRateLimited && [
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map(entry => (
              <EntryCard key={entry._id} entry={entry} setEntries={setEntries}></EntryCard>
            ))}
          </div>
        ]}
      </div>
    </div>
  )
}

export default HomePage