// api/get-user.js

import { getSession } from 'next-auth/react'
import dbConnect from '../../../lib/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '@/models/User'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getSession({ req })

	if (!session?.user?.email) {
		return res.status(401).json({ error: 'Unauthorized' })
	}

	const { email } = session.user

	try {
		await dbConnect()

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(404).json({ error: 'User not found' })
		}

		res.status(200).json(user)
	} catch (error) {
		console.error('Error fetching user data:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
