// pages/api/checkout.ts

import { NextApiRequest, NextApiResponse } from 'next'
import Order from '../../../models/Order' // Uppdatera sökvägen beroende på din filstruktur

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'POST') {
		try {
			// Implementera betalningslogik här
			// Skicka användarens och produkternas data till servern för att slutföra betalningen

			// Skapa en order
			const newOrder = new Order({
				products: req.body.products,
				user: req.body.user,
				totalAmount: req.body.totalAmount,
				// ... andra relevanta fält
			})

			// Spara order i databasen
			await newOrder.save()

			res
				.status(200)
				.json({ success: true, message: 'Order created successfully' })
		} catch (error) {
			console.error('Error processing payment and creating order:', error)
			res.status(500).json({ success: false, message: 'Error creating order' })
		}
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed' })
	}
}
