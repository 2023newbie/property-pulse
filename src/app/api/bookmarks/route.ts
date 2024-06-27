import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic'

export const GET = async () => {
    try {
        await connectDB()

        // get userid -> get bookmarks -> request bookmark infos -> show properties
        const session = await getSessionUser()

        if (!session || !session.userId) {
            return new Response('User ID is required.', { status: 401 })
        }

        const user = await User.findById(session?.userId)

        if (!user) {
            return new Response('User ID is not correct.', { status: 401 })
        }

        const properties = await Property.find({
            _id: {$in: user.bookmarks}
        })

        return new Response(JSON.stringify(properties), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response('Something went wrong!', { status: 500 })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        await connectDB()

        const { propertyId } = await request.json()

        const session = await getSessionUser()

        if (!session || !session.userId) {
            return new Response('User ID is required.', { status: 401 })
        }

        // Find user in database
        const user = await User.findById(session.userId)

        if (!user) {
            return new Response('User ID is not correct.', { status: 401 })
        }

        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId)

        let message: string

        if (isBookmarked) {
            // If already bookmarked, remove it
            user.bookmarks.pull(propertyId)
            message = 'Bookmark removed successfully.'
            isBookmarked = false
        } else {
            // If not bookmark, add it
            user.bookmarks.push(propertyId)
            message = 'Bookmark added successfully.'
            isBookmarked = true
        }

        await user.save()

        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong!', { status: 500 })
    }
}
