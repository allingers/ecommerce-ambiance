// pages/api/orders/get-latest-order-id.ts
// Enpoint för att hämta senaste orderns Id
import Order from '@/models/Order'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		try {
			const latestOrder = await Order.findOne()
				.sort({ createdAt: -1 }) // Sortera i fallande ordning baserat på skapandedatum för att få den senaste ordern först
				.limit(1)

			res.status(200).json({ success: true, orderId: latestOrder?._id })
		} catch (error) {
			console.error('Error fetching latest order ID:', error)
			res
				.status(500)
				.json({ success: false, message: 'Error fetching latest order ID' })
		}
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed' })
	}
}
