'use client';

import Loader from '@/components/loader';
import Pagination from '@/components/pagination';
import PropertyCard from '@/components/property-card';
import PropertySearchForm from '@/components/property-search-form';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const PropertiesPage = () => {
    const [properties, setProperties] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 1;
    const pageSize = searchParams.get('pageSize') || 6;

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const res = await fetch(
                    `/api/properties?page=${page}&pageSize=${pageSize}`
                );

                if (!res.ok) {
                    throw new Error('Failed to fetch data.');
                }

                const result = await res.json();

                setTotalItems(result.total);
                setProperties(result.properties);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [page]);

    return (
        <>
            <section className='bg-blue-700 py-4'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
                    <PropertySearchForm />
                </div>
            </section>
            <>
                {loading ? (
                    <Loader loading={loading} />
                ) : (
                    <section className='max-w-7xl mx-auto px-4 py-6'>
                        <div className='container-xl lg:container m-auto px-4 py-6'>
                            {properties.length === 0 ? (
                                <p>No properties found.</p>
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
            <Pagination total={totalItems} page={page} pageSize={pageSize} />
        </>
    );
};

export default PropertiesPage;
