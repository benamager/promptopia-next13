"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@/components/Profile"

export default function MyProfile() {
  const { data: session } = useSession()

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
  }, [])

  function handleEdit() {

  }

  async function handleDelete() {

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