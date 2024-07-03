const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all
async function fetchProperties({ showFeatured = false } = {}) {
    // handle the case where the domain is not available yet
    if (!apiDomain) return [];

    const res = await fetch(
        `${apiDomain}/properties${showFeatured ? '/featured' : ''}`,
        {
            cache: 'no-store',
        }
    );

    if (!res.ok) return [];

    return await res.json();
}

// Fetch single property
async function fetchProperty(id: string) {
    // handle the case where the domain is not available yet
    if (!apiDomain) return null;

    const res = await fetch(`${apiDomain}/properties/${id}`, {
        cache: 'no-store',
    });

    if (!res.ok) return [];

    return res.json();
}

export { fetchProperties, fetchProperty };
