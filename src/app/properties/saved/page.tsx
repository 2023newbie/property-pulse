import { GET } from '@/app/api/bookmarks/route'
import PropertyCard from '@/components/property-card';

const SavedPropertiesPage = async () => {
    const res = await GET()

    if (!res.ok) {
        return <p>Nothing at all!</p>
    }

    const properties = await res.json()

    return <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <h1 className="text-2xl mb-4 mt-8">Saved Properties</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property: any) => <PropertyCard property={property} />)}
        </div>
    </div>;
};

export default SavedPropertiesPage;
