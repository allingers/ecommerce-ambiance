// PaymentModal.tsx
import React from 'react'
import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
	Elements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { Modal, Button, Title } from '@mantine/core'
import classes from './Checkout.module.css'

const stripePromise = loadStripe(
	'pk_test_51NmX8qLhyajhraaskkEutRIgA7qht39d7PxFlmEo0AJgfqy1Ffc06EXMs8OPdOPyAj3z07tF5XgSbaJ3pEbqfIfi00EYuTzwXF',
)

interface StripePaymentModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirmation: () => void
}

const StripePaymentModal: React.FC<StripePaymentModalProps> = ({
	isOpen,
	onClose,
	onConfirmation,
}) => {
	const stripe = useStripe()
	const elements = useElements()

	const handlePayment = async () => {
		try {
			// Stäng modalen efter betalning
			onClose()
		} catch (error) {
			console.error('Error processing payment:', error)
		}
	}

	return (
		<Elements stripe={stripePromise}>
			<Modal size="lg" opened={isOpen} onClose={onClose}>
				<div className={classes.paymentFormContainer}>
					<Title className={classes.modalTitle}>Fyll i kortuppgifter: </Title>
					<label>
						Kortnummer:
						<div className={classes.cardElement}>
							<CardNumberElement />
						</div>
					</label>
					<label>
						Utgångsdatum:
						<div className={classes.cardElement}>
							<CardExpiryElement />
						</div>
					</label>
					<label>
						CVC:
						<div className={classes.cardElement}>
							<CardCvcElement />
						</div>
					</label>
				</div>
				<Button
					mt={20}
					className={classes.PayModalButton}
					onClick={() => {
						handlePayment()
						onConfirmation()
					}}>
					Bekräfta köp
				</Button>
			</Modal>
		</Elements>
	)
}

export default StripePaymentModal
