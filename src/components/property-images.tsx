import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import Image from 'next/image';

type PropertyImagesType = {
    images: string[];
};

const PropertyImages = ({ images }: PropertyImagesType) => {
    return (
        <section className='container m-auto max-w-7xl p-6'>
            <Gallery>
                <div>
                    {images.length === 1 ? (
                        <Item
                            original={images[0]}
                            thumbnail={images[0]}
                            width='1000'
                            height='600'>
                            {({ ref, open }) => (
                                <Image
                                    src={images[0]}
                                    alt='testing content'
                                    className='object-cover h-[400px] mx-auto rounded-xl'
                                    width={1800}
                                    height={400}
                                    priority={true}
                                    onClick={open}
                                    ref={ref}
                                />
                            )}
                        </Item>
                    ) : (
                        <div className='grid grid-cols-2 gap-4'>
                            {images.length > 0 &&
                                images.map(image => (
                                    <Item
                                        original={image}
                                        thumbnail={image}
                                        width='1000'
                                        height='600'>
                                        {({ ref, open }) => (
                                            <Image
                                            src={image}
                                            alt='testing content'
                                            className='object-cover h-[400px] mx-auto rounded-xl'
                                            width={1800}
                                            height={400}
                                            priority={true}
                                            onClick={open}
                                            ref={ref}
                                        />
                                        )}
                                    </Item>
                                ))}
                        </div>
                    )}
                </div>
            </Gallery>
        </section>
    );
};

export default PropertyImages;
