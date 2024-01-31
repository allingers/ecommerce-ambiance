// pages/order-bekraftelse.tsx
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import OrderConfirmation from '../../components/OrderConfirmation/OrderConfirmation' // Ange den korrekta sökvägen
import { Container } from '@mantine/core'
import Order from '@/models/Order'
import { GetServerSidePropsContext } from 'next'

const OrderConfirmationPage: React.FC = () => {
	const router = useRouter()

	useEffect(() => {
		// Sätt upp en timeout för att omdirigera till startsidan efter 10 sekunder
		const timeoutId = setTimeout(() => {
			router.push('/')
		}, 10000)

		// Stäng av timern om komponenten avmonteras eller om användaren navigerar vidare manuellt
		return () => clearTimeout(timeoutId)
	}, [router])

	return (
		<Container size="lg" pt={90}>
			<OrderConfirmation />
		</Container>
	)
}

export default OrderConfirmationPage
