// CheckoutStepper.tsx
import React, { useEffect, useRef, useState } from 'react'
import {
	Stepper,
	Container,
	Divider,
	Group,
	Button,
	Loader,
} from '@mantine/core'
import router from 'next/router'
import { useCart } from '@/contexts/CartContext'
import UserForm from './UserForm'
import CartOverview from './CartOverview'
import OrderInformation from './OrderInformation'
import { useSession } from 'next-auth/react'
import classes from './Checkout.module.css'

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

const CheckoutStepper: React.FC = () => {
	const { calculateCartTotal } = useCart()
	const { data: session } = useSession()
	const [activeStep, setActiveStep] = useState(0)
	const [cartProducts, setCartProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(false)
	const [saveUserInfo, setSaveUserInfo] = useState(true)
	const userFormRef = useRef<{
		validateForm: () => boolean
		validateFields: () => () => Record<string, string | null>
	} | null>(null)

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

	//Hantering av stegen i Steppern
	const nextStep = () => {
		if (activeStep === 1) {
			// Kontrollerar om userFormRef.current är null innan den används
			if (userFormRef.current) {
				// Anropa valideringsfunktionen, kontrollerar om alla fält är ifyllda
				const isFormValid = userFormRef.current.validateFields()
				if (!isFormValid) {
					console.log('Vänligen fyll i alla obligatoriska fält.')
					return
				}
			}
		}
		if (activeStep === 2) {
			setUserData((prevData) => ({
				...prevData,
			}))
		} else if (activeStep < 2) {
			setActiveStep((current) => current + 1)
		}
	}
	// Gå tillbaka till föregående steg i Stepper-komponenten
	const prevStep = () =>
		setActiveStep((current) => (current > 0 ? current - 1 : current))

	useEffect(() => {
		// Hämtar produkter från "cart" i localStorage när komponenten monterar
		const storedCartProducts = localStorage.getItem('cart')
		const cartProductsFromStorage: Product[] = storedCartProducts
			? JSON.parse(storedCartProducts)
			: []
		setCartProducts(cartProductsFromStorage)

		// Hämtar användarinformation från "userInfo" i localStorage när komponenten monterar
		const fetchSession = async () => {
			const storedUserInfo = localStorage.getItem('userInfo')

			// Om användarinformation finns, uppdatera userData-statet
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

		fetchSession() // Anropa funktionen fetchSession när komponenten monteras
	}, [])

	// Uppdaterar användarens information, både useInfo i localStorage och user-objektet i databasen
	const updateUserInfo = async (newUserData: UserData) => {
		try {
			// Uppdatera userInfo i localStorage
			localStorage.setItem('userInfo', JSON.stringify(newUserData))

			// Anropa API för att uppdatera användarens information i databasen
			const response = await fetch('/api/user/update-user-address', {
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
	//Hanterar orderprocessen, inklusive skapande av order och uppdatering av användarinformation
	const handleOrder = async () => {
		try {
			setLoading(true)
			const userEmail = userData.email

			// Kallar funktionen som uppdaterar användarinformationen OM en användare är inloggad.
			if (saveUserInfo && session) {
				await updateUserInfo(userData)
			}

			// Request till API:et för att skapa en order
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
					isGuestOrder: !session,
				}),
			})

			const data = await response.json()
			// Om orderprocessen lyckas, rensas varukorgen, och navigerar till bekräftelsesidan
			if (response.ok) {
				console.log('Order created successfully')
				clearCart()
				router.push('/order-confirm')
			} else {
				console.error('Error creating order:', data.message)
			}
		} catch (error) {
			console.error('Error processing and creating order:', error)
		} finally {
			setLoading(false)
		}
	}

	const validateUserFormFields = () => {
		// Använd ref för att få åtkomst till UserForm-funktioner
		if (userFormRef.current && userFormRef.current.validateFields) {
			return userFormRef.current.validateFields()
		}
		return {} // Om ref är null eller validateFields inte finns
	}
	return (
		<>
			<Container size="lg" pt={30}>
				<Stepper
					color="rgb(115, 153, 115"
					active={activeStep}
					onStepClick={setActiveStep}>
					<Stepper.Step label="Översikt" description="Kontrollera ditt köp">
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
						<UserForm
							validateFields={validateUserFormFields}
							userData={userData}
							setUserData={setUserData}
							ref={userFormRef}
						/>
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
