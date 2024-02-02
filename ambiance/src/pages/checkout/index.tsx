import Checkout from '@/components/Checkout/Checkout'
import { Container } from '@mantine/core'
import React, { useEffect, useRef } from 'react'

function CheckoutPage() {
	const topRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (topRef.current) {
			topRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [])

	return (
		<Container size="lg" pt={100} ref={topRef}>
			<Checkout />
		</Container>
	)
}

export default CheckoutPage
