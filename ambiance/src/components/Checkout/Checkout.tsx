import React from 'react'
import { Container, Title } from '@mantine/core'
import classes from './Checkout.module.css'
import CheckoutStepper from './CheckoutStepper'

function Checkout() {
	return (
		<>
			<Container size="lg">
				<Title className={classes.MainTitle} order={2}>
					Checkout
				</Title>
			</Container>
			<CheckoutStepper isOpen={true} onClose={() => {}} />
		</>
	)
}

export default Checkout
