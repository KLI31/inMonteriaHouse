import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { currentUser } = useSelector(state => state.user)

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
                    {currentUser ? (
                        <Link to="/profile">
                            <div className="avatar flex items-center">
                                <div className="w-8 rounded-full">
                                    <img src={currentUser.avatar} alt="profileImage" />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div>
                            <Link to="/sign-up">
                                <li>
                                    <button
                                        className="btn btn-sm btn-primary text-white"
                                    >
                                        Register
                                    </button>
                                </li>
                            </Link>
                            <Link to="/sign-in">
                                <li>
                                    <button className="btn btn-sm  btn-primary text-white">Login</button>
                                </li>
                            </Link>
                        </div>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
