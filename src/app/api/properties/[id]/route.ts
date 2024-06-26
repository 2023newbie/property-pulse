import { NextRequest } from 'next/server';
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import cloudinary from '@/config/cloudinary';

// GET /api/properties/:id
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectDB()

        const property = await Property.findById(params.id)

        if (!property) {
            return new Response('Property Not Found', { status: 404 })
        }

        return new Response(JSON.stringify(property), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong!', { status: 500 })
    }
}

// DELETE /api/properties/:id
export const DELETE = async (request: NextRequest, { params }: { params: { id: string }}) => {
    try {
        const session = await getSessionUser()

        // Check for session
        if (!session || !session.userId) {
            return new Response('Permission denied.', { status: 401 })
        }

        await connectDB()

        const property = await Property.findById(params.id)

        if (!property) {
            return new Response('Property Not Found', { status: 404 })
        }

        // Verify ownerships
        if (property.owner.toString() !== session.userId) {
            return new Response('Unauthorized.', { status: 401 })
        }

        await property.deleteOne()

        return new Response('Property deleted.', { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong!', { status: 500 })
    }
}

// PUT /api/properties/:id
export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectDB()

        const session = await getSessionUser()

        if (!session || !session.userId) {
            return new Response('User ID is required.', { status: 401 })
        }

        // @ts-ignore
        const { userId } = session

        const formData = await request.formData()

        // Access all values from amenities
        const amenities = formData.getAll('amenities')

        // Get property to update
        const existingProperty = await Property.findById(params.id)

        if (!existingProperty) {
            return new Response('Property does not exist.', { status: 404 })
        }

        // Verify ownership
        if (existingProperty.owner.toString() !== userId) {
            return new Response('Unauthorized.', { status: 401 })
        }

        // Create propertyData object for database
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId
        }

        // Updae property in database
        const updatedProperty = await Property.findByIdAndUpdate(params.id, propertyData)

        return new Response(JSON.stringify(updatedProperty), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to edit property.', { status: 500 })
    }
}
