// pages/order-bekraftelse.tsx
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import OrderConfirmation from '../../components/OrderConfirmation/OrderConfirmation' // Ange den korrekta sökvägen
import { Container } from '@mantine/core'
import { getSession } from 'next-auth/react'
import Order from '@/models/Order'
import { GetServerSidePropsContext } from 'next'

const OrderConfirmationPage: React.FC = () => {
	const router = useRouter()
	const { orderId, totalAmount } = router.query // Du kanske behöver justera detta beroende på hur du överför data från föregående sidan

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
			<OrderConfirmation
				orderId={orderId as string}
				// ... andra relevanta props
			/>
		</Container>
	)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context)

	// Om användaren inte är autentiserad kan du omdirigera dem till startsidan
	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	// Här kan du hämta ytterligare data för sidan, t.ex. orderId och totalAmount
	const userEmail = session.user?.email

	// Kontrollera om det finns en aktiv order för den inloggade användaren
	const existingOrder = await Order.findOne({
		user: userEmail,
		status: 'confirmed',
	})

	// Om det inte finns en aktiv order, omdirigera till startsidan
	if (!existingOrder) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const orderId = existingOrder._id.toString()
	const totalAmount = existingOrder.totalAmount

	return {
		props: {
			orderId,
			totalAmount,
		},
	}
}

export default OrderConfirmationPage
