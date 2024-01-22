import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../lib/dbConnect'
import User, { UserModel } from '../../models/User'

connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'PUT') {
		try {
			// Här görs anslutningen till databasen
			await connectDB()

			const { name, email, avatar } = req.body

			console.log('Received request with data:', req.body)

			// Hitta användaren med det angivna e-postadressen och uppdatera dess namn, e-post och avatar
			const updatedUser = await User.findOneAndUpdate(
				{ email: email },
				{ $set: { name, email, avatar } },
				{ new: true },
			)

			console.log(updatedUser)

			if (!updatedUser) {
				return res.status(404).json({ error: 'Användaren hittades inte' })
			}

			return res.status(200).json(updatedUser)
		} catch (error) {
			console.error(error)
			return res.status(500).json({ error: 'Serverfel' })
		}
	}

	return res.status(405).json({ error: 'Endast HTTP-metoden PUT stöds' })
}
