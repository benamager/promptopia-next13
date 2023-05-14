'use client'

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

// nested component only used in this component (Feed)
function PromptCardList({ data, setSearchText }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => setSearchText(post.tag)}
        />
      ))}
    </div>
  )
}

export default function Feed() {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])

  // When searchText changes, filter posts by searchText into filteredPosts state
  useEffect(() => {
    // If search text is empty, set empty array and return
    if (searchText === '') {
      setFilteredPosts([])
      return
    }

    // Filter posts by searchText and set filteredPosts
    const searchTextToLower = searchText.toLowerCase()
    const filteredPostsArray = posts.filter(post =>
      post.prompt.toLowerCase().includes(searchTextToLower)
      || post.tag.toLowerCase() == searchTextToLower
      || post.creator.username.toLowerCase() == searchTextToLower)

    setFilteredPosts(filteredPostsArray)

  }, [searchText, posts])

  // Fetch posts on page load
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    })();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchText ? filteredPosts : posts}
        setSearchText={setSearchText}
      />
    </section>
  );
}