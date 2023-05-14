"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation';

import Profile from "@/components/Profile"

export default function OtherProfile({ params }) {
  const [posts, setPosts] = useState([])
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  // Fetch users posts on page load
  useEffect(() => {
    (async () => {
      // Do not fetch if no params username
      if (!params.id) return

      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()
      setPosts(data)
    })();
  }, [params.id])

  return (
    <Profile
      name={username}
      desc={`Welcome to your ${username} personalized profile page`}
      data={posts}
    />
  );
}