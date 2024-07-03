'use client';

import Loader from '@/components/loader';
import PropertyCard from '@/components/property-card';
import { useEffect, useState } from 'react';

const SavedPropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/bookmarks');

                if (res.ok) {
                    const props = await res.json();
                    setProperties(props);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <Loader loading={loading} />;
    }

    return (
        <>
            {properties.length === 0 ? (
                <div>You haven't save any properties.</div>
            ) : (
                <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                    <h1 className='text-2xl mb-4 pt-8'>Saved Properties</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {properties.map((property: any) => (
                            <PropertyCard property={property} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default SavedPropertiesPage;
