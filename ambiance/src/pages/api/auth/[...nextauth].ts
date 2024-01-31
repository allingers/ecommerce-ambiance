// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import clientPromise from '../../../lib/mongodb'
import dbConnect from '../../../lib/dbConnect'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import User from '../../../models/User'
import { compare } from 'bcrypt'

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},

			async authorize(credentials) {
				await dbConnect()

				// Find user with the email
				const user = await User.findOne({
					email: credentials?.email,
				})

				// Email Not found
				if (!user) {
					throw new Error('Email is not registered')
				}

				// Check hased password with DB hashed password
				const isPasswordCorrect = await compare(
					credentials!.password,
					user.hashedPassword,
				)

				// Incorrect password
				if (!isPasswordCorrect) {
					throw new Error('Password is incorrect')
				}

				return user
			},
		}),
	],
	pages: {
		signIn: '/auth',
	},
	debug: process.env.NODE_ENV === 'development',
	adapter: MongoDBAdapter(clientPromise) as any,
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	secret: process.env.NEXTAUTH_SECRET,
})

// callbacks: {
//     async signIn({ account, profile }) {
//       if (account.provider === "google") {
//         return profile.email_verified && profile.email.endsWith("@example.com")
//       }
//       return true // Do different verification for other providers that don't have `email_verified`
//     },
