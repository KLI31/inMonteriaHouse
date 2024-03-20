import Navbar from "../components/Navbar";
import InputSearch from "../components/InputSearch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListingCard, InfoCard, NewsCard } from "../components/ListingCard";
import TestimonialsCard from "../components/TestimonialsCard";
import { PiHandshake, PiHouseLine } from "react-icons/pi";
import Footer from "../components/Footer";
import { TbStars } from "react-icons/tb";
import { motion } from "framer-motion";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Home = () => {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const [offerRes, rentRes, saleRes] = await Promise.all([
                    fetch("/api/listing/get?offer=true&limit=4"),
                    fetch("/api/listing/get?type=rent&limit=4"),
                    fetch("/api/listing/get?type=sale&limit=4"),
                ]);
                const [offerData, rentData, saleData] = await Promise.all([
                    offerRes.json(),
                    rentRes.json(),
                    saleRes.json(),
                ]);
                setOfferListings(offerData);
                setRentListings(rentData);
                setSaleListings(saleData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchListings();
    }, []);
    return (
        <div>
            <motion.main
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="relative"
            >
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.pexels.com/photos/950058/pexels-photo-950058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-95"
                        loading="lazy"
                    />
                </div>
                <div className="absolute inset-0 bg-black opacity-50" />
                <motion.div variants={fadeIn} className="relative z-10">
                    <Navbar />
                    <div className="flex items-center mx-auto max-w-7xl h-screen">
                        <main className="pt-6 pb-12 md:pb-24 lg:pb-32">
                            <div className="container px-4 md:px-6">
                                <div className="flex flex-col items-center space-y-4 ">
                                    <div className="space-y-7">
                                        <h1 className="text-8xl text-white font-bold tracking-tighter sm:text-6xl">
                                            Tu Hogar Ideal te esta esperando
                                        </h1>
                                        <p className="max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-white">
                                            Experimenta la combinación perfecta entre la vida moderna
                                            y la hospitalidad tradicional con la aplicación
                                            inMonteriaHouse. Sumérgete en una experiencia única que te
                                            ofrece una solución integral para gestionar tu estadía,
                                            conectar con tus anfitriones y explorar la rica cultura
                                            local.
                                        </p>
                                        <div className="w-1/2">
                                            <InputSearch />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </motion.div>
            </motion.main>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="mx-auto max-w-6xl mt-20"
            >
                <h1 className="text-secondary text-4xl font-semibold">
                    Explora nuestras propiedades
                </h1>
                <p className="mt-2 max-w-2xl text-xl text-gray-500">
                    Con modernas comodidades para una experiencia de vida excepcional.
                </p>
                <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
                    {offerListings && offerListings.length > 0 && (
                        <div className="">
                            <div className="my-3">
                                <h2 className="text-3xl font-semibold text-secondary">
                                    Ofertas recientes
                                </h2>
                                <Link
                                    className="text-sm text-neutral hover:underline hover:text-primary"
                                    to={"/search?offer=true"}
                                >
                                    Mostrar mas ofertas
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {offerListings.map((listing) => (
                                    <ListingCard listing={listing} key={listing._id} />
                                ))}
                            </div>
                        </div>
                    )}
                    {rentListings && rentListings.length > 0 && (
                        <div className="">
                            <div className="my-3">
                                <h2 className="text-3xl font-semibold text-secondary">
                                    Publicaciones recientes en Renta
                                </h2>
                                <Link
                                    className="text-sm text-neutral hover:underline hover:text-primary"
                                    to={"/search?type=rent"}
                                >
                                    Mostar mas ofertas en renta
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {rentListings.map((listing) => (
                                    <ListingCard listing={listing} key={listing._id} />
                                ))}
                            </div>
                        </div>
                    )}
                    {saleListings && saleListings.length > 0 && (
                        <div className="">
                            <div className="my-3">
                                <h2 className="text-3xl font-semibold text-secondary">
                                    Publicaciones recientes en venta
                                </h2>
                                <Link
                                    className="text-sm text-neutral hover:underline hover:text-primary"
                                    to={"/search?type=sale"}
                                >
                                    Mostrar mas ofertas en venta
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {saleListings.map((listing) => (
                                    <ListingCard listing={listing} key={listing._id} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="mx-auto max-w-6xl mt-20 "
            >
                <h1 className="text-secondary text-3xl font-semibold">
                    Te acompañamos en cada paso
                </h1>
                <div className="flex gap-4">
                    <InfoCard
                        title="Búsqueda clara y rápida"
                        description="Pensamos nuestros filtros para simplificar tu experiencia en nuestro portal."
                        icon={<PiHandshake size={25} className="text-secondary" />}
                    />
                    <InfoCard
                        title="Variedad de anunciantes"
                        description="Inmobiliarias y dueños directos de todo el país ofrecen las
                                mejores opciones de inmuebles para ti."
                        icon={<PiHouseLine size={25} className="text-secondary" />}
                    />
                    <InfoCard
                        title="Somos InMonteriaHouse"
                        description="10 años en el mercado y 2.5 millones de avisos publicados nos respaldan en la búsqueda de tu hogar"
                        icon={<TbStars size={25} className="text-secondary" />}
                    />
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="mx-auto max-w-6xl mt-20"
            >
                <h1 className="text-secondary text-3xl font-semibold">
                    Algunos de los testimonios de nuestros usuarios
                </h1>
                <p className="mt-2 max-w-2xl text-xl text-gray-500">
                    Conoce lo que nuestros usuarios opinan de nosotros.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-10">
                    <TestimonialsCard />
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="mx-auto max-w-6xl mt-20"
            >
                <h1 className="text-secondary text-3xl font-semibold">
                    Nuestras ultimas noticias
                </h1>
                <p className="mt-2 max-w-2xl text-xl text-gray-500">
                    Mantente informado con nuestras últimas noticias.
                </p>
                <div className="mt-10 flex items-center gap-4">
                    <NewsCard
                        title="¿Qué impuestos debo pagar al comprar o vender una casa?"
                        image="https://media.istockphoto.com/id/1464159103/es/foto/mujer-pensativa-con-la-mano-en-la-barbilla-mirando-hacia-arriba.jpg?s=612x612&w=0&k=20&c=BH3VjbA9kIj4vXQJ4Yb2kzuhniI8AJ8zPV2bgksk_dM="
                        url="https://www.withfor.com/blog/que-impuestos-hay-que-pagar-por-la-venta-de-una-vivienda/"
                    />
                    <NewsCard
                        title="Todo lo que debes de saber antes de poner en renta un departamento"
                        image="https://images.pexels.com/photos/48195/document-agreement-documents-sign-48195.jpeg?auto=compress&cs=tinysrgb&w=600"
                        url="https://www.inmuebles24.com/noticias/decoracion/9-razones-por-las-que-pintar-tu-puerta-de-color-negro/"
                    />
                    <NewsCard
                        title="Consejos para decorar con color negro tu hogar"
                        image="https://images.pexels.com/photos/6238608/pexels-photo-6238608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        url="https://www.inmuebles24.com/noticias/decoracion/9-razones-por-las-que-pintar-tu-puerta-de-color-negro/"
                    />
                </div>
            </motion.section>
            <Footer />
        </div>
    );
};

export default Home;
