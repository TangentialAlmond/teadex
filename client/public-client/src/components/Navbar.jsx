import { Link } from "react-router"

const Navbar = () => {
    return <header className="bg-neutral">

        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">

                <Link to={"/"} className="text-3xl font-bold text-neutral-content tracking-tight">
                    TeaDex
                    <span className="badge badge-neutral">public-version 0.1</span>
                </Link>

                <div className="form-control">
                    {/* TODO: Add Search icon from lucide-react beside the search bar placeholder*/}
                    <input type="text" placeholder="Search bar (not working yet)" className="input input-bordered w-24 md:w-auto" />
                </div>
                
            </div>
        </div>

    </header>
}

export default Navbar