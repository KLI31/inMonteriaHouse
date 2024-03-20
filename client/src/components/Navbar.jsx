import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";


const Navbar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const [scroll, setScroll] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("searchTerm", searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 200) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);



    return (
        <header
            className={`transition-all duration-500 ease ${scroll ? "fixed top-0 w-full bg-white shadow-md text-black z-50" : ""
                }`}
        >
            <div className="flex justify-between items-center p-4 mx-auto max-w-7xl">
                <Link to="/">
                    <h1
                        className={`text-sm sm:text-3xl font-bold ${scroll
                            ? "text-primary"
                            : location.pathname === "/"
                                ? "text-white"
                                : "text-primary"
                            }`}
                    >
                        InMonteriaHouse
                    </h1>
                </Link>
                {currentUser &&
                    location.pathname !== "/" &&
                    location.pathname !== "/search" && (
                        <form
                            onSubmit={handleSubmit}
                            className="flex bg-slate-100  rounded-lg items-center gap-2 p-2"
                        >
                            <input
                                type="text"
                                value={searchTerm}
                                placeholder="Busca tu lugar aqui"
                                className="bg-transparent focus:outline-none w-24 sm:w-64"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button>
                                <FaSearch className="text-slate-600" />
                            </button>
                        </form>
                    )}

                <ul className="flex gap-4 items-center">
                    <Link to="/">
                        <li
                            className={`text-base hidden sm:inline font-semibold  ${scroll
                                ? "text-primary"
                                : location.pathname === "/"
                                    ? "text-white"
                                    : "text-primary"
                                }`}
                        >
                            Inicio
                        </li>
                    </Link>

                    <Link to="/about">
                        <li
                            className={`text-base hidden sm:inline font-semibold  ${scroll
                                ? "text-primary"
                                : location.pathname === "/"
                                    ? "text-white"
                                    : "text-primary"
                                }`}
                        >
                            Sobre nosotros
                        </li>
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
                        <div className="flex gap-3 items-center">
                            <Link to="/sign-up">
                                <li>
                                    <button className="btn btn-sm btn-primary text-white">
                                        Registrarme
                                    </button>
                                </li>
                            </Link>
                            <Link to="/sign-in">
                                <li>
                                    <button className="btn btn-sm  btn-primary text-white">
                                        Iniciar sesion
                                    </button>
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
