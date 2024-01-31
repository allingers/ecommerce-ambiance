// OrderConfirmationComponent.tsx
import {
	Container,
	Title,
	Text,
	Box,
	Center,
	UnstyledButton,
} from '@mantine/core'
import React from 'react'
import classes from './OrderConfirmation.module.css'

interface OrderConfirmationComponentProps {
	orderId: string
}

const OrderConfirmation: React.FC<OrderConfirmationComponentProps> = ({
	orderId,
}) => {
	return (
		<Container size="lg" pt={90}>
			<Center>
				<Box className={classes.ConfirmBox}>
					<Title order={1} className={classes.ConfirmTitle}>
						Tack för din order!
					</Title>
					<Text className={classes.ConfirmSubTitle}>
						Ordernummer: {orderId}
					</Text>
				</Box>
			</Center>
		</Container>
	)
}

export default OrderConfirmation
