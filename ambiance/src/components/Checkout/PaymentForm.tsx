// PaymentForm.tsx

import { useState } from 'react'

interface PaymentFormProps {
	onSubmit: (paymentData: any) => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
	const [cardNumber, setCardNumber] = useState('')
	const [expirationDate, setExpirationDate] = useState('')
	const [cvc, setCvc] = useState('')

	const handleSubmit = () => {
		const paymentData = {
			cardNumber,
			expirationDate,
			cvc,
		}

		onSubmit(paymentData)
	}

	return (
		<div>
			<label>
				Kortnummer:
				<input
					type="text"
					value={cardNumber}
					onChange={(e) => setCardNumber(e.target.value)}
				/>
			</label>
			<label>
				Utgångsdatum:
				<input
					type="text"
					value={expirationDate}
					onChange={(e) => setExpirationDate(e.target.value)}
				/>
			</label>
			<label>
				CVC:
				<input
					type="text"
					value={cvc}
					onChange={(e) => setCvc(e.target.value)}
				/>
			</label>
			<button onClick={handleSubmit}>Betala</button>
		</div>
	)
}

export default PaymentForm
