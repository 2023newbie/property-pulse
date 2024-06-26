import connectDB from "@/config/database"
import Property from "@/models/Property"
import { NextApiRequest } from "next"
import { NextRequest } from "next/server"
import { getSessionUser } from "@/utils/getSessionUser"
import cloudinary from "@/config/cloudinary"

// GET /api/properties
export const GET = async (request: NextApiRequest) => {
    try {
        await connectDB()

        const properties = await Property.find({})

        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong!', { status: 500 })
    }
}

// POST /api/properties
export const POST = async (request: NextRequest) => {
    try {
        await connectDB()

        const session = await getSessionUser()

        if (!session || !session.userId) {
            return new Response('User ID is required.', { status: 401 })
        }

        // @ts-ignore
        const { userId } = session

        const formData = await request.formData()

        // Access all values from amenities and images
        const amenities = formData.getAll('amenities')
        const images = (formData.getAll('images') as File[]).filter((image) => image.name !== '')

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
            images: [] as string[],
            owner: userId
        }

        // Upload image(s) to Cloudinary
        const imageUploadPromise = []

        for (const image of images) {
            const imageBuffer = await image.arrayBuffer()
            const imageArray = Array.from(new Uint8Array(imageBuffer))
            const imageData = Buffer.from(imageArray)

            // Convert the image datato base64
            const imageBase64 = imageData.toString('base64')

            // Make request to upload to Cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`, {
                    folder: 'property-pulse'
                }
            )
            imageUploadPromise.push(result.secure_url)

            // Wait for all images to upload
            const uploadedImages = await Promise.all(imageUploadPromise)

            // Add uploaded images to the propertyData object
            propertyData.images = uploadedImages
        }

        const newProperty = new Property(propertyData)
        await newProperty.save()

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)
    } catch (error) {
        return new Response('Failed to add property.', { status: 500 })
    }
}
