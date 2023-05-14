import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt"

export async function GET(req, res) {
  try {
    await connectToDB()

    // find all prompts and populate the creator field
    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to fetch all prompts', {
      status: 500
    })
  }
}