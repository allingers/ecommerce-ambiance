import Checkout from '@/components/Checkout/Checkout'
import { Container } from '@mantine/core'
import React from 'react'

function CheckoutPage() {
	return (
		<Container size="lg" pt={100}>
			<Checkout />
		</Container>
	)
}

export default CheckoutPage
