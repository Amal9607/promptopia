import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"

export async function GET(req) {
    try {
        await connectToDB()
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), 
        {status: 200})
    } catch (error) {
        return new Response(JSON.stringify('Failed to fetch all prompts.'), 
        {status: 500})
    }
}