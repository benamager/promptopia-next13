'use client'

import { useState } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

export default function CreatePrompt() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const { data: session } = useSession()
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  async function createPrompt(e) {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Post new prompt to database via API route
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id
        }),
      })

      if (response.ok) {
        router.push('/')
      }

    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}