import { Link } from "react-router"
import { PlusIcon } from "lucide-react"

const Navbar = () => {
    return <header className="bg-base-300">

        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
                <Link to={"/"} className="text-3xl font-bold text-primary-content tracking-tight">
                    TeaDex Entries
                </Link>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className="size-5" />
                        <span>New entry</span>
                    </Link>
                </div>
            </div>
        </div>

    </header>
}

export default Navbar