'use client';

import BookmarkButton from '@/components/bookmark-button';
import Loader from '@/components/loader';
import PropertyContactForm from '@/components/property-contact-form';
import PropertyDetails from '@/components/property-details';
import PropertyHeaderImage from '@/components/property-header-image';
import PropertyImages from '@/components/property-images';
import ShareButton from '@/components/share-button';
import { fetchProperty } from '@/utils/requests';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'

const PropertyPage = () => {
    const { id } = useParams();

    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || property !== null) return;

        (async () => {
            try {
                const targetProperty = await fetchProperty(id as string);
                setProperty(targetProperty);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) return <Loader loading={loading} />

    if (!property && !loading) {
        return (
            <h1 className='text-center text-2xl font-bold mt-10'>
                Property Not Found.
            </h1>
        );
    }

    return (
        <>
            {!loading && property && (
                <>
                    <PropertyHeaderImage image={property.images[0]} />
                    <section>
                        <div className='container m-auto py-6 px-6 max-w-7xl'>
                            <Link
                                href='/properties'
                                className='text-blue-500 hover:text-blue-600 inline-flex items-center'>
                                <FaArrowLeft className='mr-2' /> Back to Properties
                            </Link>
                        </div>
                    </section>

                    <section className='bg-blue-50'>
                        <div className='container m-auto py-10 px-6 max-w-7xl'>
                            <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                                <PropertyDetails property={property} />

                                {/* <!-- Sidebar --> */}
                                <aside className='space-y-4'>
                                    <BookmarkButton property={property} />
                                    <ShareButton property={property} />
                                    <PropertyContactForm property={property} />
                                </aside>
                            </div>
                        </div>

                        <PropertyImages images={property.images} />
                    </section>
                </>
            )}
        </>
    );
};

export default PropertyPage;
