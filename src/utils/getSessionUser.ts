import connectDB from "@/config/database"
import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"

export const getSessionUser = async () => {
    try {
        await connectDB()

        const session = await getServerSession(authOptions)

        if (!session || !session.user) return null

        return {
            session: session.user,
            // @ts-ignore
            userId: session.user.id
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
