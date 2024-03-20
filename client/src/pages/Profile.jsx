import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { SimpleFeatureButton } from "../components/CustomButton";
import { FiEdit, FiLogOut } from "react-icons/fi";
import { MdOutlineDeleteOutline, MdOutlineAddCircleOutline, MdDeleteForever } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { BsFillGridFill } from "react-icons/bs";


export default function Profile() {
    const fileRef = useRef(null);
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [formData, setFormData] = useState({});
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);

    const dispatch = useDispatch();


    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);


    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
                toast.loading(`Uploading ${Math.round(progress)}%`, { duration: 1000 });
            },
            () => {
                toast.error("Error al cargar la imagen debe ser por lo menos 2mb");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData((prevFormData) => ({ ...prevFormData, avatar: downloadURL }));
                });
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
            toast.success('Perfil actualizado correctamente');
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch("/api/auth/signout");
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleShowListings = async () => {
        try {
            setShowListingsError(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowListingsError(true);
                return;
            }

            if (data.length === 0) {
                toast.error('No hay publicaciones disponibles.');
                return;
            }

            setUserListings(data);
        } catch (error) {
            setShowListingsError(true);
        }
    };

    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success === false) {
                return toast.error("Hubo algun error, intenta de nuevo");
            }

            setUserListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
            toast.success("Oferta eliminada Corrrectamente!");
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <div className="p-3 max-w-lg mx-auto">
            <Toaster />
            <h1 className="text-4xl font-bold text-center my-7">Mi Perfil</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-5 justify-around">
                    <img
                        src={formData.avatar || currentUser.avatar}
                        alt="profile"
                        className="rounded-full h-24 w-24 object-cover mt-2"
                    />
                    <div className="flex gap-1 items-center">
                        <h1 className="font-semibold text-xl">Bienvenido</h1>
                        <h2 className="font-semibold text-xl">{currentUser.username}</h2>
                        <input
                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                            ref={fileRef}
                            hidden
                            accept="image/*"
                        />
                    </div>
                    <SimpleFeatureButton onClick={() => fileRef.current.click()} text="Cambiar imagen" color="bg-secondary" />
                </div>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    id="username"
                    className="border p-3 rounded-lg"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Correo electronico"
                    id="email"
                    defaultValue={currentUser.email}
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    id="password"
                    className="border p-3 rounded-lg"
                />
                <button
                    disabled={loading}
                    className="btn btn-warning text-white p-4 uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Cargando..." : "Actualizar perfil"}
                </button>
                <div className="flex items-center justify-center">
                    <Link
                        to={"/create-listing"}
                    >
                        <SimpleFeatureButton
                            text="Crear Publicación"
                            color="bg-success"
                            IconComponent={MdOutlineAddCircleOutline}
                        />
                    </Link>
                </div>
            </form>
            <div className="flex justify-between mt-5">
                <SimpleFeatureButton
                    text="Borrar tu cuenta"
                    color="bg-error"
                    onClick={handleDeleteUser}
                    IconComponent={MdDeleteForever}
                />
                <SimpleFeatureButton
                    text="Cerrar sesión"
                    color="bg-secondary"
                    onClick={handleSignOut}
                    IconComponent={FiLogOut}
                />
            </div>

            <p className="text-red-700 mt-5">{error ? error : ""}</p>
            <div className="flex items-center justify-center">
                <SimpleFeatureButton
                    text="Mostrar tus publicaciones"
                    color="bg-primary"
                    onClick={handleShowListings}
                    IconComponent={BsFillGridFill}
                />
            </div>
            <p className="text-red-700 mt-5">
                {showListingsError ? "Error al mostrar tus publicaciones" : ""}
            </p>

            {userListings && userListings.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h1 className="text-center mt-7 text-2xl font-semibold">
                        Tus publicaciones
                    </h1>
                    {userListings.map((listing) => (
                        <div
                            key={listing._id}
                            className="border rounded-lg p-4 flex flex-wrap justify-center items-center gap-4"
                        >
                            <img
                                src={listing.imageUrls[0]}
                                alt="listing cover"
                                className="h-30 w-30 object-contain"
                            />
                            <p className="font-semibold text-xl">Título - {listing.name}</p>
                            <div className="flex flex-wrap items-center gap-3">
                                <Link to={`/listing/${listing._id}`}>
                                    <SimpleFeatureButton text="Ver publicación" IconComponent={GoArrowUpRight} color="bg-primary" />
                                </Link>
                                <SimpleFeatureButton
                                    text="Eliminar publicación"
                                    color="bg-error"
                                    onClick={() => handleListingDelete(listing._id)}
                                    IconComponent={MdOutlineDeleteOutline}
                                />
                                <Link to={`/update-listing/${listing._id}`}>
                                    <SimpleFeatureButton text="Editar publicación" IconComponent={FiEdit} color="bg-success" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
