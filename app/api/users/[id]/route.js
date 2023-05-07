import User from "@/models/users"
import { connectToDB } from "@/utils/database"

export async function GET(request, { params }) {
    try {
        await connectToDB()
        const user = await User.findById(params.id)
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response('Could not fetch the user', { status: 500 })
    }

}