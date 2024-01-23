// pages/api/products/randomProducts.ts

import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import { Product } from '../../../models/Product'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		try {
			// Anslut till databasen
			await dbConnect()

			// Hämta 4 slumpmässiga produkter
			const randomProducts = await Product.aggregate([{ $sample: { size: 4 } }])

			res.status(200).json(randomProducts)
		} catch (error) {
			console.error('Error fetching random products:', error)
			res.status(500).json({ error: 'Internal Server Error' })
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' })
	}
}
