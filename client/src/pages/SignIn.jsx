import { Link, useNavigate } from "react-router-dom";
import image from "../assets/image-signin.webp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFail, signInSuccess } from "../redux/user/userSlice";
import AuthGoogleButton from "../components/AuthGoogleButton";


const SignIn = () => {
    const [formData, setFormData] = useState({});
    const { error, loading } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                dispatch(signInFail(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFail(error.message));
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen">
                <img className="object-cover w-full h-full" src={image} alt="Signup" />
            </div>
            <div className="w-1/2 p-10">
                <h1 className="text-7xl font-bold mb-3 text-secondary">
                    Iniciar sesión
                </h1>
                <span className="font-semibold text-neutral">
                    Estas a un paso de encontrar tu hogar ideal
                </span>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-9 mt-9">
                        <label
                            className="block text-gray-400 text-sm font-semibold mb-2"
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
                    <div className="mb-8 mt-6">
                        <label
                            className="block text-primary text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-9/12 py-4 px-4 text-gray-700 mb-3 leading-tight focus:outline-secondary focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Ingresa una contraseña"
                            onChange={handleChange}
                        />
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center mt-5">
                            <button className="btn btn-square">
                                <span className="loading loading-spinner"></span>
                            </button>
                        </div>
                    ) : (

                        <div className="flex items-center justify-center mt-5">
                            <button
                                className="bg-primary btn btn-lg hover:bg-secondary hover:-translate-y-1 text-white font-bold  w-6/12 text-xl text-center"
                            >
                                Iniciar sesion
                            </button>
                        </div>
                    )}
                </form>
                <div className="flex items-center justify-center mt-6">
                    <AuthGoogleButton />
                </div>
                <div className="flex items-center justify-center gap-3 mt-6">
                    <span className="flex items-center justify-center mt-4 font-regular">
                        No tienes una cuenta?
                    </span>
                    <Link to="/sign-up">
                        <span className="flex items-center justify-center mt-4 font-regular text-secondary hover:-translate-y-3 transition duration-300 ease hover:font-semibold">
                            Creala aqui
                        </span>
                    </Link>
                </div>
                {error && <p className='text-error mt-5'>{error}</p>}
            </div>
        </div>
    )
}

export default SignIn