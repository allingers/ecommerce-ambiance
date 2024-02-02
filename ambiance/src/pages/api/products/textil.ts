// pages/api/products/textil.ts
// Hämtar 8 produkter inom kategorin textil
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import { Product } from '../../../models/Product'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		try {
			await dbConnect()
			const products: Product[] = await Product.find({
				'categories.main': 'textil',
			})
				.limit(8)
				.exec()
			res.status(200).json(products)
		} catch (error) {
			console.error('Error fetching textil products:', error)
			res.status(500).json({ error: 'Internal Server Error' })
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' })
	}
}
