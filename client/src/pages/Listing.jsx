import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FaShare } from "react-icons/fa";
import { useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import Contact from "../components/ButtonContact";
import { Toaster } from "react-hot-toast";
import { FaCarSide } from "react-icons/fa";
import { LuBed } from "react-icons/lu";
import { TbBath } from "react-icons/tb";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
import { CustomButton, SimpleFeatureButton } from "../components/CustomButton";
import HouseImageError from "../assets/houseError.webp"

const Listing = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(false);
    const [openDialog, setOpenDialog] = useState(true);
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);


    const handleContactClick = () => {
        setOpenDialog(true);
        setContact(true);
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <Toaster />

            <div className="flex items-center justify-center ">
                {loading && <span className="loading loading-spinner loading-lg h-screen"></span>}
                {error && <div className=" flex flex-col items-center gap-2">
                    <img src={HouseImageError} alt="imageError" width={60} height={60} />
                    <p className="font-semibold text-error">Ha ocurrido un error, por favor intente de nuevo</p>
                </div>}
            </div>
            {listing && !loading && !error && (
                <div className="relative overflow-hidden bg-black text-white">
                    <Carousel images={listing.imageUrls} />
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex flex-col justify-between p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-6xl font-bold">{listing.name}</h1>
                                <div className="flex items-center mt-4 gap-1">
                                    <FaLocationDot className="text-primary" />
                                    <p className="text-lg font-semibold text-secondary">{listing.address}</p>
                                </div>
                            </div>
                            <button className="btn btn-circle bg-secondary p-4" onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success('Copiado al portapapeles!');
                            }}>
                                <FaShare className="text-white" />
                            </button>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2 items-center">
                                    <div className="flex flex-col gap-2 mr-2">
                                        {listing.offer && (
                                            <p className="text-xl font-semibold mt-2">
                                                Precio Total:{" "}
                                                {new Intl.NumberFormat("es-CO", {
                                                    style: "currency",
                                                    currency: "COP",
                                                }).format(+listing.regularPrice - +listing.discountPrice)}
                                                {`${listing.type === "rent" ? " / Mensual" : ""}`}
                                            </p>
                                        )}
                                        <span className="text-lg font-semibold">
                                            {listing.offer
                                                ? `Descuento: ${(
                                                    listing.regularPrice -
                                                    (listing.regularPrice - listing.discountPrice)
                                                ).toLocaleString("es-CO", {
                                                    style: "currency",
                                                    currency: "COP",
                                                })}`
                                                : `${listing.regularPrice.toLocaleString("es-CO", {
                                                    style: "currency",
                                                    currency: "COP",
                                                })}${listing.type === "rent" ? " / Mensual" : ""}`
                                            }
                                        </span>
                                    </div>
                                    <Button color="green">{listing.type === 'rent' ? 'Disponible para arrendar' : 'En venta'}</Button>
                                </div>
                                {currentUser && listing.userRef !== currentUser._id && (
                                    <Button onClick={handleContactClick} className="bg-primary text-white rounded-lg">
                                        Contactar con el vendedor
                                    </Button>
                                )}
                            </div>
                            <div className="bg-white text-black p-4 rounded-lg shadow mt-4">
                                <span className="text-secondary text-sm">El descuento se aplica automaticamente</span>
                                <h3 className="font-semibold text-xl mb-2">Descripción</h3>
                                <p className="text-gray-800 text-justify whitespace-normal break-words">
                                    {listing.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 justify-start items-center mt-5">
                                <CustomButton
                                    hasFeature={listing.bathrooms > 0}
                                    featureCount={listing.bathrooms}
                                    singleFeatureText="Baño"
                                    multipleFeatureText="Baños"
                                    noFeatureText="Sin Habitaciones"
                                    colorOn="bg-secondary"
                                    colorOff="bg-gray-400"
                                    IconComponent={TbBath}
                                />
                                <CustomButton
                                    hasFeature={listing.bedrooms > 0}
                                    featureCount={listing.bedrooms}
                                    singleFeatureText="Habitación"
                                    multipleFeatureText="Habitaciones"
                                    noFeatureText="Sin Habitaciones"
                                    colorOn="bg-secondary"
                                    colorOff="bg-gray-400"
                                    IconComponent={LuBed}
                                />
                                <SimpleFeatureButton
                                    text={listing.parking ? 'Parqueadero Disponible' : 'Sin Parqueadero'}
                                    color={listing.parking ? 'bg-green-500' : 'bg-red-500'}
                                    IconComponent={FaCarSide}
                                    onClick={false}
                                />
                                <SimpleFeatureButton
                                    text={listing.furnished ? 'Amueblado' : 'No amueblado'}
                                    color={listing.furnished ? 'bg-green-500' : 'bg-red-500'}
                                    onClick={false}
                                />
                            </div>
                        </div>
                        {contact && <Contact listing={listing} open={openDialog} setOpen={setOpenDialog} />}
                    </div>
                </div >
            )
            }
        </div >
    );
};

export default Listing;

