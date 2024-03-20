import Footer from "../components/Footer";
import { motion } from "framer-motion";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const About = () => {
    return (
        <div className="">
            <div className="w-full mx-auto max-w-7xl">
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="py-12 lg:py-16 xl:py-24"
                >
                    <div className="container px-4 md:px-6">
                        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-secondary">
                                    Acerca de InMonteriaHouse
                                </h1>
                                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                                    Tu socio de confianza en encontrar el hogar perfecto. Estamos
                                    comprometidos a proporcionarte las mejores herramientas y
                                    experiencia para hacer que tu búsqueda de hogar sea una
                                    experiencia encantadora.
                                </p>
                            </div>
                            <img
                                alt="Hero"
                                className="mx-auto aspect-video overflow-hidden rounded-xl  sm:w-full object-center lg:aspect-video lg:rounded-3xl"
                                height="300"
                                src="https://images.pexels.com/photos/950058/pexels-photo-950058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                width="700"
                            />
                        </div>
                    </div>
                </motion.section>
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="py-12 lg:py-16 xl:py-24"
                >
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="container px-4 md:px-6"
                    >
                        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-secondary">
                                    Encuentra tu hogar de ensueño
                                </h2>
                                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                                    Busca a través de nuestras listas seleccionadas para descubrir
                                    el hogar perfecto para ti. Nuestras funciones de búsqueda
                                    avanzada facilitan encontrar exactamente lo que estás
                                    buscando.
                                </p>
                            </div>
                            <div className="grid items-start gap-4 text-center lg:items-center lg:grid-cols-3 lg:gap-8">
                                <div className="flex flex-col items-center space-y-2 hover:-translate-y-3 transition duration-300 ease ">
                                    <img
                                        alt="Icon"
                                        className="hover:-translate-y-3 transition duration-300 ease rounded-full aspect-square overflow-hidden"
                                        height="150"
                                        src="https://images.pexels.com/photos/4050319/pexels-photo-4050319.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                        width="150"
                                        style={{
                                            objectFit: "cover",
                                        }}
                                        loading="lazy"
                                    />
                                    <p className="text-sm font-medium text-orange-500">
                                        Buscar propiedades
                                    </p>
                                </div>
                                <div className="flex flex-col items-center space-y-2 hover:-translate-y-3 transition duration-300 ease ">
                                    <img
                                        alt="Icon"
                                        className="hover:-translate-y-3 transition duration-300 ease rounded-full aspect-square overflow-hidden "
                                        height="150"
                                        src="https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        width="150"
                                        style={{
                                            objectFit: "cover",
                                        }}
                                        loading="lazy"
                                    />
                                    <p className="text-sm font-medium text-orange-500">
                                        Contacto directo con el vendedor
                                    </p>
                                </div>
                                <div className="flex flex-col items-center space-y-2 hover:-translate-y-3 transition duration-300 ease  ">
                                    <img
                                        alt="Icon"
                                        className="hover:-translate-y-3 transition duration-300 ease rounded-full aspect-square overflow-hidden"
                                        height="150"
                                        src="https://images.pexels.com/photos/262470/pexels-photo-262470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        width="150"
                                        style={{
                                            objectFit: "cover",
                                        }}
                                        loading="lazy"
                                    />
                                    <p className="text-sm font-medium text-orange-500">
                                        Precios muy bajos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="py-12 lg:py-16 xl:py-24"
                >
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="container px-4 md:px-6"
                    >
                        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                            <img
                                alt="Hero"
                                className="mx-auto aspect-video overflow-hidden rounded-xl  sm:w-full object-center lg:aspect-video lg:rounded-3xl"
                                height="300"
                                src="https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                style={{
                                    aspectRatio: "356/224",
                                    objectFit: "cover",
                                }}
                            />
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-secondary">
                                    Conoce a al equipo de InMonteriaHouse
                                </h2>
                                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                                    Nuestro equipo de expertos en bienes raíces está dedicado a
                                    ayudarte a encontrar tu hogar perfecto. Combinamos nuestro
                                    conocimiento del mercado con una pasión por el servicio al
                                    cliente para hacer que tu experiencia de compra de vivienda
                                    sea excepcional.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>
            </div>
            <Footer />
        </div>
    );
};

export default About;
