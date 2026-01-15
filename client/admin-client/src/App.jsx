import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import EntryViewPage from "./pages/EntryViewPage"
import EntryEditPage from "./pages/EntryEditPage"
import NotFoundPage from "../../shared/pages/NotFoundPage"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div data-theme="cupcake">

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create" element={<CreatePage />}/>
        <Route path="/entry/:id/view" element={<EntryViewPage />}/>
        <Route path="/entry/:id/edit" element={<EntryEditPage />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </div>
  )
}

export default App