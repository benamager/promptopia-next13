import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt"

// GET /api/users/:id/posts this { params } gets populated with the id from the url
export async function GET(req, { params }) {
  try {
    await connectToDB()

    // find all prompts and populate the creator field
    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator')

    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to fetch all prompts', {
      status: 500
    })
  }
}