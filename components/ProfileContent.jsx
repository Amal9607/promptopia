"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "./Profile"


const ProfileContent = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [myPosts, setMyPosts] = useState(null)

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE'
                })

                const filteredPosts = myPosts.filter((p) => p._id !== post._id)
                setMyPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()

            setMyPosts(data)
        }
        if (session?.user.id) {
            fetchPrompts()
        }
    }, [session?.user.id])

    return (
        <Profile name="My" data={myPosts} handleEdit={handleEdit} handleDelete={handleDelete} desc="Welcome to your personalized profile page" />
    )
}
export default ProfileContent