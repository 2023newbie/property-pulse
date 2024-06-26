const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all
async function fetchProperties() {
    // handle the case where the domain is not available yet
    if (!apiDomain) return [];

    try {
        const res = await fetch(`${apiDomain}/properties`, {
            cache: 'no-store'
        });

        if (!res.ok) throw new Error('Failed to fetch data.');

        return await res.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Fetch single property
async function fetchProperty(id: string) {
    // handle the case where the domain is not available yet
    if (!apiDomain) return null;

    try {
        const res = await fetch(`${apiDomain}/properties/${id}`, {
            cache: 'no-store'
        });

        if (!res.ok) throw new Error('Failed to fetch data.');

        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export { fetchProperties, fetchProperty };
