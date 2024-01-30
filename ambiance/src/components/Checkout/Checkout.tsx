import React from 'react'
import CheckoutStepper from './CheckoutStepper'
import { Container, Title } from '@mantine/core'
import classes from './Checkout.module.css'

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
