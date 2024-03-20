import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const InputSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-1 rounded max-w-full flex justify-between items-center">
                <input
                    type="text"
                    value={searchTerm}
                    placeholder="Busca tu lugar aqui"
                    className="focus:outline-none p-2 sm:w-64"
                    onChange={(e) => setSearchTerm(e.target.value)}

                />
                <button className="btn btn-primary btn-xl">
                    Buscar
                </button>
            </form>
        </div>
    )
}

export default InputSearch