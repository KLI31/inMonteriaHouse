import { ListingCard } from "../components/ListingCard"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardPlacehoderSkeleton from "../components/Skeleton";

const Search = () => {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
            setListings(data);
            setLoading(false);
        };

        fetchListings();
    }, [location.search]);

    const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'rent' ||
            e.target.id === 'sale'
        ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }

        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setSidebardata({
                ...sidebardata,
                [e.target.id]:
                    e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
            setShowMore(false);
        }
        setListings([...listings, ...data]);
    };


    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex flex-col  gap-2'>
                        <label className='whitespace-nowrap font-semibold'>
                            Buscar por:
                        </label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Buscar...'
                            className='border rounded-lg p-3 w-full'
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <label className='font-semibold'>Tipo:</label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='all'
                                className="checkbox checkbox-secondary [--chkfg:white] "
                                onChange={handleChange}
                                checked={sidebardata.type === 'all'}
                            />
                            <span>Arriendo y venta</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className="checkbox checkbox-secondary [--chkfg:white] "
                                onChange={handleChange}
                                checked={sidebardata.type === 'rent'}
                            />
                            <span>En arriendo</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className="checkbox checkbox-secondary [--chkfg:white] "
                                onChange={handleChange}
                                checked={sidebardata.type === 'sale'}
                            />
                            <span>En venta</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className="checkbox checkbox-secondary [--chkfg:white] "
                                onChange={handleChange}
                                checked={sidebardata.offer}
                            />
                            <span>En oferta</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <label className='font-semibold'>Servicios:</label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className="checkbox checkbox-secondary [--chkfg:white] "
                                onChange={handleChange}
                                checked={sidebardata.parking}
                            />
                            <span>Parqueadero</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className="checkbox checkbox-secondary [--chkfg:white] "
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                            />
                            <span>Amueblado</span>
                        </div>
                    </div>
                    <div className='flex flex-col  gap-2'>
                        <label className='font-semibold'>Organizar por:</label>
                        <select
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            id='sort_order'
                            className='border rounded-lg p-3'
                        >
                            <option value='regularPrice_desc'>desde el mas alto al mas bajo</option>
                            <option value='regularPrice_asc'>desde el mas bajo al mas alto</option>
                            <option value='createdAt_desc'>Mas reciente</option>
                            <option value='createdAt_asc'>Mas antiguo</option>
                        </select>
                    </div>
                    <button className='btn btn-secondary  text-white p-3 rounded-lg uppercase'>
                        Buscar
                    </button>
                </form>
            </div>
            <div className='max-w-7xl mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {!loading && listings.length === 0 && (
                    <p className='text-xl text-slate-700 col-span-full'>No hay publicaciones disponibles</p>
                )}
                {loading && (
                    <div className="flex mx-auto items-center justify-center mt-10 col-span-full">
                        <CardPlacehoderSkeleton />
                    </div>
                )}

                {!loading &&
                    listings &&
                    listings.map((listing) => (
                        <div key={listing._id} className="flex flex-col items-center justify-center h-full gap-1">
                            <ListingCard key={listing._id} listing={listing} />
                        </div>
                    ))}

                {showMore && (
                    <button
                        onClick={onShowMoreClick}
                        className='text-green-700 hover:underline p-7 text-center w-full col-span-full'
                    >
                        Mostrar más
                    </button>
                )}
            </div>

        </div>
    )
}

export default Search