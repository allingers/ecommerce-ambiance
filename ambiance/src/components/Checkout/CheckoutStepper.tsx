// CheckoutStepper.tsx
import React, { useEffect, useState } from 'react'
import {
	Stepper,
	Container,
	Divider,
	Group,
	Button,
	Loader,
} from '@mantine/core'
import classes from './Checkout.module.css'
import router from 'next/router'
import { useCart } from '@/contexts/CartContext'
import UserForm from './UserForm'
import CartOverview from './CartOverview'
import OrderInformation from './OrderInformation'

interface CheckoutStepperProps {
	isOpen: boolean
	onClose: () => void
}

export interface Product {
	productId: string
	quantity: number
	price: number
	name: string
	image: string
}

export interface Address {
	address: string
	co?: string
	city: string
	postalCode: string
}

export interface UserData {
	name: string
	email: string
	phoneNumber: string
	address: Address
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({
	isOpen,
	onClose,
}) => {
	const { calculateCartTotal } = useCart()
	const [activeStep, setActiveStep] = useState(0)
	const [cartProducts, setCartProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [saveUserInfo, setSaveUserInfo] = useState(true)
	const [userData, setUserData] = useState<UserData>({
		name: '',
		email: '',
		phoneNumber: '',
		address: {
			address: '',
			city: '',
			postalCode: '',
		},
	})
	// Tömmer Cart i localStorage efter lagd order
	const cartKey = 'cart'
	const clearCart = () => {
		localStorage.removeItem(cartKey)
	}

	//Hantering av stegen
	const nextStep = () => {
		// Om det är steg 2, uppdatera userData och gå vidare till nästa steg
		if (activeStep === 2) {
			setUserData((prevData) => ({
				...prevData,
			}))
			setActiveStep((current) => (current < 3 ? current + 1 : current))
		} else if (activeStep < 2) {
			setActiveStep((current) => current + 1)
		}
	}
	// Om det är första steget går det inte att gå tillbaka
	const prevStep = () =>
		setActiveStep((current) => (current > 0 ? current - 1 : current))

	useEffect(() => {
		// Hämta produkter från localStorage när komponenten mountar
		const storedCartProducts = localStorage.getItem('cart')
		const cartProductsFromStorage: Product[] = storedCartProducts
			? JSON.parse(storedCartProducts)
			: []
		setCartProducts(cartProductsFromStorage)

		//Hämta information om användaren som finns sparad i localStorage
		const fetchSession = async () => {
			const storedUserInfo = localStorage.getItem('userInfo')

			if (storedUserInfo) {
				const userInfo = JSON.parse(storedUserInfo)

				setUserData({
					name: userInfo.name || '',
					email: userInfo.email || '',
					phoneNumber: userInfo.phoneNumber || '',
					address: {
						address: userInfo.address.address || '',
						city: userInfo.address.city || '',
						postalCode: userInfo.address.postalCode || '',
					},
				})
			}
		}

		fetchSession()
	}, [])

	// Funktionen för att uppdatera användarinformation
	const updateUserInfo = async (newUserData: UserData) => {
		try {
			// Uppdatera userInfo i localStorage
			localStorage.setItem('userInfo', JSON.stringify(newUserData))

			// Anropa API för att uppdatera användarens information i databasen
			const response = await fetch('/api/user/update-user-adress', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUserData),
			})

			if (response.ok) {
				console.log('Användarinformation uppdaterad i databasen')
			} else {
				console.error('Fel vid uppdatering av användarinformation i databasen')
			}
		} catch (error) {
			console.error('Fel vid uppdatering av användarinformation:', error)
		}
	}

	const handleOrder = async () => {
		try {
			const userEmail = userData.email

			if (saveUserInfo) {
				await updateUserInfo(userData)
			}
			const response = await fetch('/api/checkout/create-order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					products: cartProducts.map((product) => ({
						productId: product.productId,
						quantity: product.quantity,
						price: product.price,
					})),
					user: userEmail,
					totalAmount: calculateCartTotal(),
				}),
			})

			const data = await response.json()

			if (response.ok) {
				console.log('Order created successfully')
				clearCart()
				router.push('/order-confirm')
			} else {
				console.error('Error creating order:', data.message)
			}
		} catch (error) {
			console.error('Error processing payment and creating order:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Container size="lg" pt={30}>
				<Stepper
					color="rgb(115, 153, 115"
					active={activeStep}
					onStepClick={setActiveStep}>
					<Stepper.Step label="Översikt" description="Kontrollera ditt köp">
						{/* Visa översikt av produkter*/}
						{loading && (
							<div>
								<Loader color="gray" type="dots" />
							</div>
						)}
						<CartOverview products={cartProducts} />
					</Stepper.Step>
					<Stepper.Step
						label="Användaruppgifter"
						description="Fyll i dina uppgifter">
						{loading && (
							<div>
								<Loader color="gray" type="dots" />
							</div>
						)}
						<UserForm userData={userData} setUserData={setUserData} />
					</Stepper.Step>
					<Stepper.Step label="Beställning" description="Lägg din order">
						{loading && (
							<div>
								<Loader color="gray" type="dots" />
							</div>
						)}
						<OrderInformation
							products={cartProducts}
							userData={userData}
							saveUserInfo={saveUserInfo}
							setSaveUserInfo={setSaveUserInfo}
						/>
					</Stepper.Step>
				</Stepper>
			</Container>
			<Divider mt={15} />
			<Group justify="center" mt="xl">
				{activeStep > 0 && (
					<Button
						className={classes.BackButton}
						variant="default"
						onClick={prevStep}>
						Tillbaka
					</Button>
				)}
				{activeStep < 2 ? (
					<Button
						color="white"
						fw={500}
						className={classes.NextButton}
						onClick={nextStep}>
						Nästa steg
					</Button>
				) : (
					<Button className={classes.PayButton} onClick={handleOrder}>
						Lägg din order
					</Button>
				)}
			</Group>
		</>
	)
}

export default CheckoutStepper
