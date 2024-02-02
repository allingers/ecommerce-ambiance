// pages/order-confirm.tsx
// Orderbekräftelse sida
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import OrderConfirmation from '../../components/OrderConfirmation/OrderConfirmation'
import { Container, Loader } from '@mantine/core'

const OrderConfirmationPage: React.FC = () => {
	const router = useRouter()
	const [orderId, setOrderId] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Använder order-id från query-parametrar
				const { orderId } = router.query

				if (typeof orderId === 'string') {
					setOrderId(orderId)
				} else {
					// Om orderId inte finns i query-parametrar, görs en förfrågan för att hämta id från senaste ordern.
					const response = await fetch(`/api/orders/get-latest-order-id`)
					const data = await response.json()

					// Uppdaterar state med order-id
					if (response.ok) {
						setOrderId(data.orderId)
						const timeoutId = setTimeout(() => {
							router.push('/')
						}, 10000)

						// Stänger av timern om komponenten avmonteras eller om användaren navigerar vidare manuellt
						return () => clearTimeout(timeoutId)
					} else {
						console.error('Error fetching order details:', data.message)
					}
				}
			} catch (error) {
				console.error('Error fetching order details:', error)
			}
		}

		fetchData()
	}, [router.query, router])

	if (!orderId) {
		return (
			<Container size="lg" pt={90}>
				<Loader color="gray" />
			</Container>
		)
	}

	return (
		<Container size="lg" pt={90}>
			<OrderConfirmation orderId={orderId} />
		</Container>
	)
}

export default OrderConfirmationPage
