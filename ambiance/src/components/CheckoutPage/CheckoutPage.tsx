// components/CheckoutPage.tsx
import React, { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import {
	Button,
	Container,
	Box,
	Text,
	Center,
	Divider,
	Image,
	Title,
} from '@mantine/core'
import { ProductModel } from '@/models/Product'
import classes from './CheckoutPage.module.css'

const CheckoutPage: React.FC = () => {
	const { cartItems, calculateCartTotal } = useCart()
	const [products, setProducts] = useState<ProductModel[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				// Hämta produktinformation från din backend eller databas
				const response = await fetch('/api/products')
				const data = await response.json()
				setProducts(data)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching product details:', error)
				setLoading(false)
			}
		}

		fetchProductDetails()
	}, [])

	const handleCheckout = async () => {
		try {
			const response = await fetch('/api/checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(cartItems),
			})

			const session = await response.json()

			if (response.ok) {
				const stripe = await loadStripe('DIN_STRIPE_PUBLIC_KEY')
				const result = await stripe.redirectToCheckout({
					sessionId: session.id,
				})

				if (result.error) {
					console.error('Error redirecting to checkout:', result.error)
					// Hantera fel här om det behövs
				}
			} else {
				console.error('Error creating checkout session:', session.error)
				// Hantera fel här om det behövs
			}
		} catch (error) {
			console.error('Error fetching checkout session:', error)
			// Hantera fel här om det behövs
		}
	}

	return (
		<Container className={classes.checkoutContainer} size="lg" pt={70}>
			<Title className={classes.checkOutTitle}>Checkout</Title>
			<Divider />
			{/* Visa lista över produkter i varukorgen */}
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					{cartItems.map((cartItem) => {
						const product = products.find((p) => p._id === cartItem.productId)

						if (!product) {
							return null
						}

						return (
							<div
								key={cartItem.productId}
								className={classes.cartItemContainer}>
								<div className={classes.cartItem}>
									<Image
										src={product.imageUrls[0]}
										alt={product.name}
										width={80}
										height={80}
										className={classes.image}
									/>

									<Text className={classes.name}>{product.name}</Text>
									<Text>Antal: {cartItem.quantity}</Text>
									<Text className={classes.price}>{product.price} SEK</Text>
								</div>
							</div>
						)
					})}
				</div>
			)}
			<Divider />

			{/* Visa totalsumma och checkout-knapp */}
			<Center>
				<Box className={classes.checkOutTotalContainer}>
					<Text className={classes.checkOutTotal}>
						Totalsumma: {calculateCartTotal()} SEK
					</Text>
					<Button onClick={handleCheckout} className={classes.CheckoutButton}>
						Vidare till betalning
					</Button>
				</Box>
			</Center>
		</Container>
	)
}

export default CheckoutPage
