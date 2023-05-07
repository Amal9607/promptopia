'use client'

import { useState, useEffect, useMemo, useCallback } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}


const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState(null)

  const handleSearchInput = (e) => {
    setSearchText(e.target.value)
  }

  const filteredPost = useMemo(() => {
    if (!posts) {
      return []
    }
    return posts.filter((post) => post.prompt.includes(searchText) || post.creator.username.includes(searchText) || post.tag.includes(searchText))
  }, [searchText, posts])

  const handleTagClick = useCallback((tag) => {
    setSearchText(tag)
  }, [setSearchText])

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/prompt`)
      const data = await response.json()

      setPosts(data)
    }
    fetchPrompts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="search" placeholder="Search for a username or a tag" value={searchText} onInput={handleSearchInput} className="search_input peer" />
      </form>
      {posts && <PromptCardList data={filteredPost} handleTagClick={handleTagClick} />}
    </section>
  )
}
export default Feed