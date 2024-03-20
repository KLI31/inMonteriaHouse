import { Typography } from "@material-tailwind/react";


const Footer = () => {
    return (
        <footer className="w-full bg-white p-8 mt-20 rounded-lg">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
                <div className="flex items-center gap-2">

                    <h2 className="font-semibold text-xl text-primary">InMonteriaHouse</h2>
                </div>
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-semibold transition-colors hover:text-secondary"
                        >
                            Sobre Nosotros
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-semibold transition-colors hover:text-secondary"
                        >
                            Licencia
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-semibold transition-colors hover:text-secondary"
                        >
                            Asesoramiento
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-semibold transition-colors hover:text-secondary "
                        >
                            Contactanos
                        </Typography>
                    </li>
                </ul>
            </div>
        </footer>
    );
}


export default Footer