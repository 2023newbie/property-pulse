import Image from 'next/image';

type PropertyImagesType = {
    images: string[];
};

const PropertyImages = ({ images }: PropertyImagesType) => {
    return (
        <section className='container m-auto max-w-7xl p-6'>
            <div className=''>
                {images.length === 1 ? (
                    <Image
                        src={images[0]}
                        alt='testing content'
                        className='object-cover h-[400px] mx-auto rounded-xl'
                        width={1800}
                        height={400}
                        priority={true}
                    />
                ) : (
                    <div className='grid grid-cols-2 gap-4'>
                        {images.map((image, index) => (
                            <div
                                key={index}>
                                <Image
                                    src={image}
                                    alt=''
                                    className='object-cover h-[400px] w-full rounded-xl'
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    priority={true}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PropertyImages;
