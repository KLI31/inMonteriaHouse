import { Link } from "react-router-dom";
import { LuBed } from "react-icons/lu";
import { TbBath } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";

const ListingCard = ({ listing }) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/listing/${listing._id}`}>
                <img
                    alt="House"
                    className="w-full h-56 object-cover object-center hover:scale-105 transition-scale duration-300"
                    src={
                        listing.imageUrls[0] ||
                        "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
                    }
                    loading="lazy"
                />
                <div className="p-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                        {listing.name}
                    </h5>
                    <p className="mt-1 text-xs text-gray-500 flex items-center gap-2"><FaLocationDot />{listing.address}</p>
                    <p className="mt-2 text-sm text-gray-700 overflow-hidden text-justify line-clamp-2 break-words">
                        {listing.description.length > 100
                            ? `${listing.description.substring(0, 100)}...`
                            : listing.description}
                    </p>
                    <div className="flex flex-col justify-center mt-4">
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

                        {listing.offer && (
                            <span className="font-semibold mt-2">
                                Precio Total:{" "}
                                {new Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                }).format(+listing.regularPrice - +listing.discountPrice)}
                                {`${listing.type === "rent" ? " / Mensual" : ""}`}
                            </span>
                        )}
                        <div className="flex items-center mt-2 gap-3">
                            <span className="ml-1 text-sm text-gray-700 flex items-center gap-2">
                                <LuBed />
                                {listing.bedrooms > 1
                                    ? `${listing.bedrooms} Habitaciones`
                                    : `${listing.bedrooms} Habitación`}
                            </span>
                            <span className="ml-1 text-sm text-gray-700 flex items-center gap-2">
                                <TbBath />
                                {listing.bathrooms > 1
                                    ? `${listing.bathrooms} Baños`
                                    : `${listing.bathrooms} Baño`}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const InfoCard = ({ title, description, icon }) => {
    return (
        <div className="mt-10 border border-primary w-1/3 rounded-md">
            <div className="flex flex-col items-center p-2 justify-center mx-auto">
                {icon}
                <h2 className="font-semibold text-xl text-neutral">{title}</h2>
                <p className="text-center font-regular text-gray-500">{description}</p>
            </div>
        </div>
    );
};

const NewsCard = ({ title, image, url }) => {
    const handleClick = () => {
        window.open(url, "_blank");
    };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg">
            <img
                alt="House"
                className="w-full h-36 object-cover object-center hover:scale-70 transition-scale duration-300 rounded-lg"
                height="224"
                src={image}
                style={{
                    aspectRatio: "356/224",
                    objectFit: "cover",
                }}
                width="356"
                loading="lazy"
            />
            <div className="p-5" onClick={handleClick}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 transition ease-in 2000 hover:text-primary cursor-pointer">
                    {title}
                </h5>
            </div>
        </div>
    );
};

export { ListingCard, InfoCard, NewsCard };
