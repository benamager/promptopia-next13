'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Form";

export default function EditPrompt() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  // Fetch prompt on page load
  useEffect(() => {
    (async () => {
      // Do not fetch if no prompt id
      if (!promptId) return

      // Get prompt from database via API route
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    })();
  }, [promptId])

  // updatePrompt function
  async function updatePrompt(e) {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert('Prompt ID not found')

    try {
      // Update prompt from database via API route
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}