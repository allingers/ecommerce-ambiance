// pages/api/favorites/add.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import { Product } from '../../../models/Product'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { productId, userEmail } = req.body

	try {
		await dbConnect()

		// Hitta användaren baserat på e-postadress
		const user = await User.findOne({ email: userEmail })

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		// Kontrollera om produkten redan finns i favoritlistan
		if (user.favorites.includes(productId)) {
			return res.status(400).json({ message: 'Product already in favorites' })
		}

		// Hämta produkt baserat på productId
		const product: Product | null = await Product.findOne({
			_id: productId as string,
		}).exec()

		if (!product) {
			return res.status(404).json({ error: 'Product not found' })
		}

		// Lägg till produktens ObjectId i användarens favoriter
		user.favorites.push(productId)

		// Spara användaren med den uppdaterade favoritlistan
		await user.save()

		res.status(200).json({ message: 'Product added to favorites successfully' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}
