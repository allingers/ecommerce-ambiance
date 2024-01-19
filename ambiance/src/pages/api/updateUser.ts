import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../lib/dbConnect'
import User, { UserModel } from '../../models/User'

connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'PATCH' || req.method === 'PUT') {
		const { id, name, email, hashedPassword } = req.body

		try {
			// Hitta användaren med det angivna ID:t och uppdatera dess namn och e-post
			const updatedUser = await User.findOneAndUpdate(
				{ _id: id },
				{ $set: { name, email, hashedPassword } },
				{ new: true },
			)

			if (!updatedUser) {
				return res.status(404).json({ error: 'Användaren hittades inte' })
			}

			return res.status(200).json(updatedUser)
		} catch (error) {
			console.error(error)
			return res.status(500).json({ error: 'Serverfel' })
		}
	}

	return res
		.status(405)
		.json({ error: 'Endast HTTP-metoderna PATCH och PUT stöds' })
}
