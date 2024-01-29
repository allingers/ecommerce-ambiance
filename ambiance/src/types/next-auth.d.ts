// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			name: string
			email: string
			hashedPassword: string
			favorites: Array
		}
	}
}
