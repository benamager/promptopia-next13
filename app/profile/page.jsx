"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@/components/Profile"

export default function MyProfile() {
  const { data: session } = useSession()
  const router = useRouter()

  const [posts, setPosts] = useState([])

  // Fetch posts on page load
  useEffect(() => {
    (async () => {
      // Do not fetch if no session user id
      if (!session?.user.id) return

      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setPosts(data)
    })();
  }, [session?.user.id])

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`)
  }

  async function handleDelete(post) {
    const hasConfimed = confirm("Are you sure you want to delete this prompt?")

    if (hasConfimed) {
      try {
        // Delete prompt from database via API route
        await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE'
        })

        // Remove prompt from state
        const filteredPosts = posts.filter((p) => p._id !== post._id)
        setPosts(filteredPosts)

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}