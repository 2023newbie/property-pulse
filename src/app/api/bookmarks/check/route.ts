import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic'

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

        return new Response(JSON.stringify({ isBookmarked }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong!', { status: 500 })
    }
}
