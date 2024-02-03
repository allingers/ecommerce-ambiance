// pages/api/checkout/create-order.ts
// Endpoint för att skapa ny order
import { NextApiRequest, NextApiResponse } from 'next'
import Order from '../../../models/Order'
import dbConnect from '../../../lib/dbConnect'
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'POST') {
		try {
			const db = await dbConnect()
			// Skapar en order
			const newOrder = new Order({
				products: req.body.products,
				user: req.body.user,
				totalAmount: req.body.totalAmount,
				isGuestOrder: req.body.isGuestOrder || false,
			})

			// Sparar order i databasen
			const savedOrder = await newOrder.save()

			res.status(200).json({
				success: true,
				message: 'Order created successfully',
				orderId: savedOrder._id,
			})
		} catch (error) {
			console.error('Error processing payment and creating order:', error)
			res.status(500).json({ success: false, message: 'Error creating order' })
		}
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed' })
	}
}