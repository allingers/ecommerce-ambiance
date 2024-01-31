// pages/api/orders.ts
import { NextApiRequest, NextApiResponse } from 'next'
import Order from '../../../models/Order' // Uppdatera sökvägen beroende på din filstruktur

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		try {
			const userEmail = req.query.userEmail as string // Hämta användarens e-postadress från förfrågan

			// Hämta ordrar kopplade till användarens e-postadress
			const orders = await Order.find({ user: userEmail })

			res.status(200).json({ success: true, orders })
		} catch (error) {
			console.error('Error fetching orders:', error)
			res.status(500).json({ success: false, message: 'Error fetching orders' })
		}
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed' })
	}
}
