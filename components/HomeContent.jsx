"use client"

import { useSession } from "next-auth/react"
import Feed from "./Feed"

const HomeContent = () => {
    const { data: session } = useSession()
    return (
        <>
            {session?.user ? <Feed /> : (
                <section className="feed">
                    <h1 className="font-semibold text-xl blue_gradient">Please sign in to your account</h1>
                </section>
            )}
        </>
    )
}
export default HomeContent