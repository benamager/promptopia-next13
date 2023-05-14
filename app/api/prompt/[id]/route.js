import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt"

// GET (read)
export async function GET(req, { params }) {
  try {
    await connectToDB()

    // find specific prompt and populate the creator field
    const prompt = await Prompt.findById(params.id).populate('creator')

    // prompt not found
    if (!prompt) {
      return new Response('Prompt not found', {
        status: 404
      })
    }

    // return prompt as JSON
    return new Response(JSON.stringify(prompt), {
      status: 200
    })
  } catch (error) {
    return new Response(`Failed to fetch prompt with ID: ${params.id}`, {
      status: 500
    })
  }
}

// PATCH (update)
export async function PATCH(req, { params }) {
  const { prompt, tag } = await req.json()

  try {
    await connectToDB()

    // find the existing prompt and populate the creator field
    const existingPrompt = await Prompt.findById(params.id).populate('creator')

    if (!existingPrompt) {
      return new Response(`Prompt with the ID: ${params.id} not found.`, {
        status: 404
      })
    }

    // update the prompt and tag fields in mongoDB
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to update to prompt', {
      status: 500
    })
  }
}

// DELETE (delete)
export async function DELETE(req, { params }) {
  try {
    await connectToDB()

    await Prompt.findByIdAndDelete(params.id)

    return new Response('Prompt deleted successfully', {
      status: 200
    })

  } catch (error) {
    return new Response('Failed to delete prompt', {
      status: 500
    })
  }
}