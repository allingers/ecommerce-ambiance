// checkout-session/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import stripe from 'stripe'

const stripeApi = new stripe(
	'sk_test_51NmX8qLhyajhraasWYai406FeVcFcAjHCcaQ8J1aripoW42yr5H7JolRlnwNvoBjqFsZxTvS2HVoQ0PtijCx4s1h00HTzaWljF',
)

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).end() // Method Not Allowed
	}

	const { success, sessionId, error } = await createCheckoutSession(req.body)

	if (success) {
		res.status(200).json({ sessionId })
	} else {
		res.status(500).json({ error })
	}
}

async function createCheckoutSession(cartItems) {
	try {
		// Hämta produktinformation från din nya produktDetails-endpoint för varje produkt i cartItems
		const productDetailsPromises = cartItems.map(async (item) => {
			try {
				// Anropa din nya produktDetails-API-rutt direkt här
				const response = await fetch(`/api/productDetails/${item.productId}`)
				const data = await response.json()

				if (response.ok) {
					console.log('Product details:', data)

					// Kontrollera om data är null eller undefined innan du försöker läsa egenskaper
					if (data && data.name && data.image) {
						return {
							name: data.name,
							image: data.image,
							price: item.price,
							quantity: item.quantity,
						}
					} else {
						console.error('Invalid product details:', data)
						return null
					}
				} else {
					console.error('Error fetching product details:', data.error)
					return null
				}
			} catch (error) {
				console.error('Error parsing product details response:', error)
				return null
			}
		})

		// Vänta på att alla produktinformationer ska hämtas
		const productDetails = await Promise.all(productDetailsPromises)

		// Kontrollera om någon produktinformation saknas
		if (productDetails.some((detail) => detail === null)) {
			console.error('Some product details are missing.')
			return { success: false, error: 'Internal server error' }
		}

		console.log('Product details:', productDetails)
		// Skapa en Stripe-checkout-session och returnera session ID
		const session = await stripeApi.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: productDetails.map((item) => ({
				price_data: {
					currency: 'sek',
					product_data: {
						name: item.name,
						images: [item.image],
					},
					unit_amount: item.price * 100,
				},
				quantity: item.quantity,
			})),
			mode: 'payment',
			success_url: 'http://localhost:3000/confirmation',
			cancel_url: 'http://localhost:3000/canceled',
		})

		return { success: true, sessionId: session.id }
	} catch (error) {
		console.error('Error creating checkout session:', error)
		return { success: false, error: 'Internal server error' }
	}
}
