import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import image from "../assets/image-signup.webp";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                toast.error(data.message);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            toast.success("Te has registrado perfectamente", {
                duration: 1000,
            });
            setTimeout(() => {
                navigate('/sign-in');
            }, 1000);
        } catch (error) {
            setLoading(false);
            toast.error("No se pudo registrar, intentalo de nuevo", error.message);
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Toaster />
            <div className="w-1/2 h-screen">
                <img className="object-cover w-full h-full" src={image} alt="Signup" />
            </div>
            <div className="w-1/2 p-10">
                <h1 className="text-5xl font-bold mb-2 text-secondary">
                    InMonteriaHouse
                </h1>
                <span className="font-semibold text-neutral">
                    El hogar perfecto para tu comodidad
                </span>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4 mt-8">
                        <label
                            className="block text-primary text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Usuario
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-9/12 py-4 px-4 text-gray-700 leading-tight focus:outline-secondary focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Ingresa tu nombre de usuario"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-8">
                        <label
                            className="block text-primary text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-9/12 py-4 px-4 text-gray-700 leading-tight focus:outline-secondary focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Ingresa tu email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-8">
                        <label
                            className="block text-primary text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-9/12 py-4 px-4 text-gray-700 leading-tight focus:outline-secondary focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Ingresa una contraseña"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-5 ">
                        <button
                            disabled={loading}
                            className="bg-primary btn btn-lg hover:bg-secondary hover:-translate-y-1 text-white font-bold  w-6/12 text-xl text-center"
                        >
                            {loading ? "Cargando..." : "Registrarse"}
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center gap-3 mt-6">
                    <span className="flex items-center justify-center mt-4 font-regular">
                        Ya tienes una cuenta?
                    </span>
                    <Link to="/sign-in">
                        <span className="flex items-center justify-center mt-4 font-regular text-secondary hover:-translate-y-3 transition duration-300 ease hover:font-semibold">
                            Inicia sesion aqui
                        </span>
                    </Link>
                </div>
                {error && <p className='text-error mt-5'>El valor de los inputs es necesario</p>}
            </div>
        </div>
    );
};

export default SignUp;
