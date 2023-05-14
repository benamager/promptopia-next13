'use client'

import { useState } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

export default function CreatePrompt() {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  async function createPrompt(e) {

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