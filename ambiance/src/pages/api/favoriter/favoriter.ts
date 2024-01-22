// pages/api/favoriter/favoriter.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { userEmail } = req.body

	try {
		await dbConnect()

		// Hitta användaren baserat på e-postadress
		const user = await User.findOne({ email: userEmail })

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		// Returnera hela användaren inklusive favoriter
		res.status(200).json({ user })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}
