import { useState, useEffect } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateListing = () => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: "rent",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`);
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setFormData(data);
        };

        fetchListing();
    }, []);

    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                    setImageUploadError(false);
                    setUploading(false);
                })
                .catch(() => {
                    setImageUploadError("La imagen no debe pasar de 2mb");
                    setUploading(false);
                });
        } else {
            setImageUploadError("Solo puedes subir 6 imagenes por publicacion");
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.id === "sale" || e.target.id === "rent") {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (
            e.target.id === "parking" ||
            e.target.id === "furnished" ||
            e.target.id === "offer"
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === "number" ||
            e.target.type === "text" ||
            e.target.type === "textarea"
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1)
                return setError("Debes subir por lo menos una imagen");
            if (+formData.regularPrice < +formData.discountPrice)
                return setError("El precio de descuento debe ser menor al precio regular");
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl p-6">
            <h1 className="mb-6 text-4xl font-bold">Actualiza tu oferta</h1>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4 p-3 flex flex-col gap-3">
                    <input
                        type="text"
                        id="name"
                        placeholder="Nombre"
                        className="border-2 p-3 rounded border-gray-300 transition duration-300 ease-in-out focus:border-secondary focus:outline-none"
                        maxLength="62"
                        minLength="10"
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        className="border-2 p-3 rounded  border-gray-300 transition duration-300 ease-in-out focus:border-secondary focus:outline-none resize-none "
                        placeholder="Descripcion"
                        required
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        type="text"
                    />
                    <input
                        placeholder="Direccion"
                        required
                        id="address"
                        className="border-2 p-3 rounded border-gray-300 transition duration-300 ease-in-out focus:border-secondary focus:outline-none"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <div className="flex flex-wrap gap-4 items-center ml-3">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-secondary [--chkfg:white]"
                            id="sale"
                            name="sale"
                            checked={formData.type === "sale"}
                            onChange={handleChange}
                        />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="sale"
                        >
                            En venta
                        </label>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-secondary [--chkfg:white]"
                            id="rent"
                            name="rent"
                            checked={formData.type === "rent"}
                            onChange={handleChange}
                        />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="rent"
                        >
                            En alquiler
                        </label>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-secondary [--chkfg:white]"
                            id="parking"
                            checked={formData.parking}
                            onChange={handleChange}
                        />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="parking-spot"
                        >
                            Parqueadero
                        </label>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-secondary [--chkfg:white]"
                            id="furnished"
                            checked={formData.furnished}
                            onChange={handleChange}
                        />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="furnished"
                        >
                            Amoblado
                        </label>
                        <input
                            type="checkbox"
                            className="checkbox checkbox-secondary [--chkfg:white] "
                            id="offer"
                            checked={formData.offer}
                            onChange={handleChange}
                        />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="offer"
                        >
                            Oferta
                        </label>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2 flex-wrap p-2 mr-2">
                            <input
                                type="number"
                                id="bedrooms"
                                required
                                placeholder="Habitaciones"
                                min={1}
                                max={10}
                                className="border-2 p-3 rounded border-gray-300 transition duration-300 ease-in-out focus:border-secondary focus:outline-none"
                                value={formData.bedrooms}
                                onChange={handleChange}
                            />
                            <p className="font-semibold">Habitaciones</p>
                            <input
                                type="number"
                                id="bathrooms"
                                required
                                min={1}
                                max={10}
                                placeholder="Baños"
                                className="border-2 p-3 rounded border-gray-300 transition duration-300 ease-in-out focus:border-secondary focus:outline-none"
                                value={formData.bathrooms}
                                onChange={handleChange}
                            />
                            <p className="font-semibold">Baños</p>
                            <input
                                type="number"
                                id="regularPrice"
                                required
                                placeholder="Precio Regular"
                                className="border-2 p-3 rounded border-gray-300 transition duration-300 ease-in-out focus:border-secondary focus:outline-none"
                                value={formData.regularPrice}
                                onChange={handleChange}
                            />
                            <div className="flex items-center flex-col">
                                <p className="font-semibold">Precio Regular</p>
                                {formData.type === "rent" && (
                                    <span className="text-xs font-semibold">($ / month)</span>
                                )}
                            </div>
                            {formData.offer && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <input
                                        type="number"
                                        id="discountPrice"
                                        min="0"
                                        max="10000000"
                                        required
                                        placeholder="Precio de descuento"
                                        className="mt-2 border-2 p-3 rounded border-gray-300 transition duration-300 ease-in-out focus:border-secondary focus:outline-none"
                                        value={formData.discountPrice}
                                        onChange={handleChange}
                                    />
                                    <p className="font-semibold">Descuento</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-8">
                        <div>
                            <label
                                className="block text-sm font-medium leading-none mb-2"
                                htmlFor="image-upload"
                            >
                                Imagenes: Maximo 6 imagenes por publicacion
                            </label>
                            <input
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 text-center"
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => setFiles(e.target.files)}
                            />
                        </div>
                        <button
                            disabled={uploading}
                            type="button"
                            onClick={handleImageSubmit}
                            className="btn  bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            {uploading ? "Cargando..." : "Subir imagenes"}
                        </button>
                        <p className="text-error text-sm">
                            {imageUploadError && imageUploadError}
                        </p>
                    </div>
                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div key={url} className="flex flex-col gap-5 p-3 items-center">
                                <div
                                    className="flex w-1/2 h-1/2 border items-center justify-center rounded border-gray-300  hover:bg-orange-100 transition duration-300 ease-in-out"
                                >
                                    <img
                                        src={url}
                                        alt="listing image"
                                        className="w-30 h-30 object-contain rounded-lg"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className=" btn btn-error p-3 text-white rounded-lg uppercase hover:opacity-75"
                                >
                                    Borrar imagen
                                </button>
                            </div>
                        ))}
                    <button
                        disabled={loading || uploading}
                        className="btn w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                        {loading ? "Cargando..." : "Actualizar publicacion"}
                    </button>
                    {error && <p className="text-error text-sm">{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default UpdateListing;
