// pages/api/checkout/guest-order.ts

import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'POST') {
		try {
			const db = await dbConnect()

			// Hantera gästbeställningen här
			const {
				products,
				guestUser,
				totalAmount /* andra nödvändiga uppgifter */,
			} = req.body

			// Skapa en order i databasen för gästanvändaren
			const order = {
				products,
				guestUser,
				totalAmount,
				// ... andra nödvändiga uppgifter för beställningen
			}

			// Spara order i databasen
			await db.collection('orders').insertOne(order)

			res
				.status(200)
				.json({ success: true, message: 'Guest order created successfully' })
		} catch (error) {
			console.error('Error creating guest order:', error)
			res
				.status(500)
				.json({ success: false, message: 'Error creating guest order' })
		}
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed' })
	}
}
