//pages/api/category.ts
//Hämtar alla huvudkategorier
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbConnect'
import Category from '../../models/Category'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		try {
			const db = await dbConnect()
			const categories: Category[] = await Category.find({}).exec()
			res.status(200).json(categories)
		} catch (error) {
			console.error('Error fetching categories:', error)
			res.status(500).json({ error: 'Internal Server Error' })
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' })
	}
}
