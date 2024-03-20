import { Carousel as ImageSlider } from '@material-tailwind/react'


export const Carousel = ({ images }) => {
    return (
        <div>
            {images.length > 1 ? (
                <ImageSlider loop autoplay nextArrow={false} prevArrow={false}>
                    {images.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`image ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    ))}
                </ImageSlider>
            ) : (
                <img
                    src={images[0]}
                    alt="image 1"
                    className="h-full w-full object-cover rounded-xl "
                />
            )}
        </div>
    )
}


export default Carousel