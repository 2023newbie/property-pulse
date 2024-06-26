import Image from "next/image";

type PropertyHeaderImageType = {
    image: string;
};

const PropertyHeaderImage = ({ image }: PropertyHeaderImageType) => {
    return (
        <section>
            <div className='container-xl m-auto'>
                <div className='grid grid-cols-1'>
                    <Image
                        src={image}
                        alt=''
                        className='object-cover h-[400px] w-full'
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default PropertyHeaderImage;
