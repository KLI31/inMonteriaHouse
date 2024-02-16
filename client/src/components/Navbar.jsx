import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


const Navbar = () => {

    return (
        <header>
            <div className="flex justify-between items-center p-4 mx-auto max-w-7xl ">
                <h1 className="text-sm sm:text-3xl font-bold text-primary">
                    InMonteriaHouse
                </h1>

                <form className="flex bg-slate-100  rounded-lg items-center gap-2 p-2">
                    <input
                        type="text"
                        name=""
                        placeholder="Busca tu lugar aqui"
                        className="bg-transparent focus:outline-none w-24 sm:w-64"

                    />
                    <FaSearch className="text-primary" />
                </form>

                <ul className="flex gap-4 items-center">
                    <Link to="/">
                        <li className="text-base font-semibold hidden sm:inline">Home</li>
                    </Link>

                    <Link to="/about">
                        <li className="text-base font-semibold hidden sm:inline">About</li>
                    </Link>
                    <Link to="/signup">
                        <li>
                            <button
                                className="btn btn-sm btn-primary text-white"
                            >
                                Register
                            </button>
                        </li>
                    </Link>
                    <li>
                        <button className="btn btn-sm  btn-primary text-white">Login</button>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
