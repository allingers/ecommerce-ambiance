// api/update-user.js
import dbConnect from '../../../lib/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '@/models/User'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}

	const { email, address, phoneNumber } = req.body

	try {
		await dbConnect()

		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{ $set: { address, phoneNumber } },
			{ new: true },
		)

		if (!updatedUser) {
			return res.status(404).json({ error: 'User not found' })
		}

		res
			.status(200)
			.json({ message: 'User information updated', user: updatedUser })
	} catch (error) {
		console.error('Error updating user data:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
