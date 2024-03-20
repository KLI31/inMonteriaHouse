import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Textarea } from '@material-tailwind/react';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography
} from "@material-tailwind/react";

const Contact = ({ listing, open, setOpen }) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLandlord();
    }, [listing.userRef]);


    const handleOpen = () => setOpen(!open);

    return (
        <>
            {landlord && (
                <Dialog open={open} size="xs" handler={handleOpen}>
                    <DialogHeader className="flex flex-col items-start">
                        <Typography className="mb-1" variant="h3">
                            Mensaje para {landlord.username}
                        </Typography>
                    </DialogHeader>
                    <div className='flex flex-col gap-2'>
                        <DialogBody>
                            <p className='mb-6 text-black'>
                                Contactar a  <span className='font-semibold text-primary'>{landlord.username}</span>{' '}
                                Para {" "}
                                <span className='font-semibold text-primary'>{listing.name.toLowerCase()}</span>
                            </p>
                            <Textarea
                                name='message'
                                id='message'
                                rows='2'
                                value={message}
                                onChange={onChange}
                                size="lg"
                                label='Escribe tu mensaje aqui'
                                color="orange"
                                className='p-3 rounded-lg'
                            ></Textarea>
                        </DialogBody>
                        <DialogFooter>
                            <button onClick={handleOpen} className='text-primary font-semibold'>
                                Cancelar
                            </button>
                            <Link
                                to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                                className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                            >
                                <Button>
                                    Enviar mensaje
                                </Button>
                            </Link>
                        </DialogFooter>
                    </div>
                </Dialog>
            )}
        </>
    );
}

export default Contact