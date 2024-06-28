'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/property-card';
import Loader from '@/components/loader';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertySearchForm from '@/components/property-search-form';

const SeachResultsPage = () => {
    const searchParams = useSearchParams();

    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    let queryUrl = '/api/properties/search';
    if (location) {
        queryUrl += '?';
        queryUrl += `location=${location}`;
    }
    if (propertyType) {
        if (!queryUrl.includes('?')) queryUrl += '?';
        queryUrl += `propertyType=${propertyType}`;
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(queryUrl);

                if (!res.ok) return <div>Nothing Found.</div>;

                const result = await res.json();

                setProperties(result);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [searchParams]);

    return (
        <>
            <section className="bg-blue-700 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                    <PropertySearchForm />
                </div>
            </section>
            {loading ? (
                <Loader loading={loading} />
            ) : (
                <section className='max-w-7xl mx-auto px-4 py-6'>
                    <div className='container-xl lg:container m-auto px-4 py-6'>
                        <Link href='/properties' className='flex items-center text-blue-500 hover:underline mb-3'>
                            <FaArrowAltCircleLeft className='mr-2' size={15} /> Back to Properties
                        </Link>
                        <h1 className="text-2xl mb-4">Search Results: </h1>
                        {properties.length === 0 ? (
                            <p>No search results.</p>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                {properties.map(prop => (
                                    <PropertyCard
                                        key={prop._id}
                                        property={prop}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};

export default SeachResultsPage;
