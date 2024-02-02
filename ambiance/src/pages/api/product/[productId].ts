// pages/api/product/[productId].ts
// Hämtar produkt beroende på produktId
// Hämtar relaterade och rekommmenderade produkter beroende på vilken produkt.
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import { Product } from '../../../models/Product'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { productId } = req.query

	if (!productId) {
		return res.status(400).json({ error: 'Product ID is required' })
	}

	try {
		const db = await dbConnect()
		const product: Product | null = await Product.findOne({
			_id: productId as string,
		}).exec()

		if (!product) {
			return res.status(404).json({ error: 'Product not found' })
		}

		// Hämtar 3 relaterade produkter från samma kategori
		const relatedProducts: Product[] = await Product.find({
			'categories.main': product.categories.main,
		})
			.limit(3)
			.exec()

		// Hämtar 8 random produkter från samma huvudkategori
		const recommendedProducts: Product[] = await Product.aggregate([
			{
				$match: {
					'categories.main': product.categories.main,
					_id: { $ne: productId as string },
				},
			},
			{ $sample: { size: 8 } },
		])

		res.status(200).json({ product, relatedProducts, recommendedProducts })
	} catch (error) {
		console.error('Error fetching product details:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
