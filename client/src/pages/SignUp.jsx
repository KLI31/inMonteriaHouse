import { Link } from "react-router-dom";
import image from "../assets/image-signup.webp"
import { useState } from "react";

const SignUp = () => {

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    console.log(formData);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen">
                <img
                    className="object-cover w-full h-full"
                    src={image}
                    alt="Signup"
                />
            </div>
            <div className="w-1/2 p-10">
                <h1 className="text-5xl font-bold mb-2 text-secondary">InMonteriaHouse</h1>
                <span className="font-semibold text-neutral">El hogar perfecto para tu comodidad</span>
                <form>
                    <div className="mb-4 mt-8">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Usuario
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Ingresa tu nombre de usuario"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-8">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Ingresa tu email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-8">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Ingresa una contraseña"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-5 ">
                        <button
                            className="bg-primary btn hover:bg-secondary text-white font-bold py-4 px-5 rounded focus:outline-none focus:shadow-outline w-full "
                            type="button"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center gap-3">
                    <span className="flex items-center justify-center mt-4 font-regular">
                        Ya tienes una cuenta?
                    </span>
                    <Link to="/">
                        <span className="flex items-center justify-center mt-4 font-regular text-secondary">Inicia sesion aqui</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
