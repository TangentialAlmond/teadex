import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import EntryViewPage from "./pages/EntryViewPage"

const App = () => {
  return (
    <div data-theme="cupcake">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/entry/:id/view" element={<EntryViewPage />}/>
      </Routes>
    </div>
  )
}

export default App