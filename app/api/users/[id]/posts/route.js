import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"

export async function GET(req, { params }) {
    try {
        await connectToDB()
        const prompts = await Prompt.find({ creator: params.id }).populate('creator')
        return new Response(JSON.stringify(prompts))
    } catch (error) {

    }
}