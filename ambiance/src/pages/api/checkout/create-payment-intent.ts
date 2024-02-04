import { NextApiRequest, NextApiResponse } from 'next'
import stripe from 'stripe'

const stripeSecretKey =
	process.env.STRIPE_SECRET_KEY! ||
	'sk_test_51NmX8qLhyajhraasWYai406FeVcFcAjHCcaQ8J1aripoW42yr5H7JolRlnwNvoBjqFsZxTvS2HVoQ0PtijCx4s1h00HTzaWljF'
const stripeClient = new stripe(stripeSecretKey)

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).end() // Method Not Allowed
	}

	try {
		const { paymentMethodId, totalAmount } = req.body

		const amountInOre = Math.round(totalAmount * 100)

		// Ange din returadress här
		const returnUrl = 'http://localhost:3000/order-confirm'

		// Skapa en betalningsavsikt med Stripe
		const intent = await stripeClient.paymentIntents.create({
			payment_method: paymentMethodId,
			amount: amountInOre, // Använd det totala beloppet från klientsidan
			currency: 'sek',
			confirmation_method: 'automatic',
			confirm: true,
			return_url: returnUrl, // Lägg till returadressen här
		})

		res.json({ clientSecret: intent.client_secret })
	} catch (error) {
		console.error('Error creating payment intent:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
