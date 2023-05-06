import User from "@/models/users";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
            try {
                await connectToDB()
                // check if a user already exists
                const userExists = await User.findOne({ email: profile?.email })
                // if not create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }