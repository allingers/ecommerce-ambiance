import React, { useEffect, useState } from 'react'
import {
	Stepper,
	Button,
	Group,
	Container,
	Image,
	Text,
	SimpleGrid,
	Divider,
	TextInput,
	Box,
} from '@mantine/core'
import classes from './Checkout.module.css'
import router from 'next/router'
import { useCart } from '@/contexts/CartContext'

interface Product {
	productId: string
	quantity: number
	price: number
	name: string
	image: string
}

interface CheckoutStepperProps {
	isOpen: boolean
	onClose: () => void
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({}) => {
	const [activeStep, setActiveStep] = useState(1)
	const [cartProducts, setCartProducts] = useState<Product[]>([])
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
	const { calculateCartTotal } = useCart()

	const cartKey = 'cart'
	// Funktion för att tömma Cart i localStorage
	const clearCart = () => {
		localStorage.removeItem(cartKey)
	}
	useEffect(() => {
		// Hämta produkter från localStorage när komponenten mountar
		const storedCartProducts = localStorage.getItem('cart')
		const cartProductsFromStorage: Product[] = storedCartProducts
			? JSON.parse(storedCartProducts)
			: []
		setCartProducts(cartProductsFromStorage)

		// Hämta användaruppgifter från sessionsdata om användaren är inloggad
		const fetchSession = async () => {
			const storedUserInfo = localStorage.getItem('userInfo')
			if (storedUserInfo) {
				const userInfo = JSON.parse(storedUserInfo)

				setUserData({
					name: userInfo.name || '',
					email: userInfo.email || '',
					phoneNumber: userInfo.phoneNumber || '', // Fyll i användarens telefonnummer om det finns tillgängligt i sessionsdata
					address: {
						address: userInfo.address.address || '', // Fyll i användarens adressuppgifter om det finns tillgängligt i sessionsdata
						city: userInfo.address.city || '',
						postalCode: userInfo.address.postalCode || '',
					},
				})
			}
		}

		fetchSession()
	}, [])

	const nextStep = () => {
		if (activeStep === 1) {
			setActiveStep((current) => (current < 4 ? current + 1 : current))
		} else if (activeStep === 3) {
			// Om det är steg 3, uppdatera userData och gå vidare till nästa steg
			setUserData((prevData) => ({
				...prevData,
			}))

			setActiveStep((current) => (current < 4 ? current + 1 : current))
		} else if (activeStep < 4) {
			// Om det inte är steg 1 eller 3, gå vidare till nästa steg direkt
			setActiveStep((current) => current + 1)
		}
	}
	const prevStep = () =>
		setActiveStep((current) => (current > 1 ? current - 1 : current))

	const handleOrder = async () => {
		try {
			const storedUserInfo = localStorage.getItem('userInfo')

			if (storedUserInfo) {
				const userInfo = JSON.parse(storedUserInfo)

				// Nu har du användarinformationen från localStorage (t.ex., email)
				const userEmail = userInfo.email

				// Anropa den nya endpointen för att uppdatera användaren
				const updateUserResponse = await fetch('/api/user/update-user-adress', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: userEmail,
						address: userData.address,
						phoneNumber: userData.phoneNumber,
					}),
				})

				const updateUserData = await updateUserResponse.json()

				if (updateUserResponse.ok) {
					console.log('User data updated successfully:', updateUserData)
					const updatedUserInfo = {
						...userInfo,
						address: userData.address,
						phoneNumber: userData.phoneNumber,
					}

					localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo))
					// Skicka användarens och produkternas data till servern för att slutföra order
					const response = await fetch('/api/checkout/order', {
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
							user: userEmail, // Användarens e-postadress som referens
							totalAmount: calculateCartTotal(),
							// ... andra nödvändiga orderuppgifter
						}),
					})

					const data = await response.json()

					if (response.ok) {
						console.log('Order created successfully')
						clearCart()
						// Navigera till orderbekräftelsessidan
						router.push('/order-confirm')
					} else {
						console.error('Error creating order:', data.message)
						// Hantera fel här, visa felmeddelande för användaren eller liknande
					}
				} else {
					console.error('Error updating user data:', updateUserData.message)
					// Hantera fel här, visa felmeddelande för användaren eller liknande
				}
			}
		} catch (error) {
			console.error('Error processing payment and creating order:', error)
			// Hantera fel här, visa felmeddelande för användaren eller liknande
		}
	}
	return (
		<>
			<Container size="lg" pt={30}>
				<Stepper
					color="rgb(115, 153, 115"
					active={activeStep}
					onStepClick={setActiveStep}>
					<Stepper.Step
						disabled={true}
						label="Shoppa"
						description="Varukorgen"></Stepper.Step>
					<Stepper.Step label="Översikt" description="Kontrollera ditt köp">
						{/* Visa översikt av produkter*/}
						<CartOverview products={cartProducts} />
					</Stepper.Step>
					<Stepper.Step
						label="Användaruppgifter"
						description="Fyll i dina uppgifter">
						{/* Formulär för användaruppgifter */}
						<UserDetailsForm userData={userData} setUserData={setUserData} />
					</Stepper.Step>
					<Stepper.Step label="Beställning" description="Lägg din order">
						{/* Simulering av betalning */}
						<OrderInformation products={cartProducts} userData={userData} />
					</Stepper.Step>
					<Stepper.Completed>
						Tack för din beställning! Klicka på "Back" för att ändra något.
					</Stepper.Completed>
				</Stepper>
			</Container>
			<Divider mt={15} />
			<Group justify="center" mt="xl">
				{activeStep > 1 && (
					<Button
						className={classes.BackButton}
						variant="default"
						onClick={prevStep}>
						Tillbaka
					</Button>
				)}
				{activeStep < 3 ? (
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

// ----- Överiskt produkter i varukogen  - step 2 -----
const CartOverview: React.FC<{ products: Product[] }> = ({ products }) => (
	<div>
		<Container size="lg" pt={20}>
			{products.map((product, index) => (
				<div key={index} className={classes.cartItemContainer}>
					<SimpleGrid
						className={classes.cartItem}
						cols={{ base: 1, sm: 2, lg: 4 }}
						spacing={{ base: 10, sm: 'xl', md: 'xxl', lg: 'xxl' }}
						verticalSpacing={{ base: 'md', sm: 'xl' }}>
						<Image
							src={product.image}
							alt={product.name}
							width={80}
							height={80}
							className={classes.image}
						/>
						<Text className={classes.name}>{product.name}</Text>
						<Text className={classes.price}>{product.price} SEK</Text>
					</SimpleGrid>
				</div>
			))}
		</Container>
	</div>
)

// ----- Användarinformation - steg 3 -----
interface Address {
	address: string
	co?: string
	city: string
	postalCode: string
}

interface UserData {
	name: string
	email: string
	phoneNumber: string
	address: Address
}

interface UserDetailsFormProps {
	userData: UserData
	setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
	userData,
	setUserData,
}) => {
	return (
		<Container size="lg" pt={20}>
			<SimpleGrid
				cols={{ base: 1, sm: 1, md: 1, lg: 2 }}
				spacing={{ base: 10, sm: 'xl' }}
				verticalSpacing={{ base: 'xl', sm: 'xl' }}>
				<div className={classes.UserInfoCol}>
					<TextInput
						label="Förnamn"
						placeholder="Ange fullständigt namn"
						required={true}
						value={userData.name}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								firstName: event.target.value,
							}))
						}
					/>

					<TextInput
						label="E-post"
						placeholder="Ange e-postadress"
						required={true}
						value={userData.email}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								email: event.target.value,
							}))
						}
					/>

					<TextInput
						label="Telefonnummer"
						placeholder="Ange telefonnummer"
						required={true}
						value={userData.phoneNumber}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								phoneNumber: event.target.value,
							}))
						}
					/>
				</div>
				<div className={classes.AdressInfoCol}>
					<TextInput
						label="Adress"
						placeholder="Ange adress"
						required={true}
						value={userData.address.address}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								address: { ...prevData.address, address: event.target.value },
							}))
						}
					/>

					<TextInput
						label="Ort"
						placeholder="Ange Ort"
						required={true}
						value={userData.address.city}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								address: { ...prevData.address, city: event.target.value },
							}))
						}
					/>

					<TextInput
						label="Postnummer"
						placeholder="Ange postnummer"
						required={true}
						value={userData.address.postalCode}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								address: {
									...prevData.address,
									postalCode: event.target.value,
								},
							}))
						}
					/>
				</div>
			</SimpleGrid>
		</Container>
	)
}

// Orderöversikt - steg 4

interface PaymentInformationProps {
	products: Product[]
	userData: UserData
}

const OrderInformation: React.FC<PaymentInformationProps> = ({
	products,
	userData,
}) => (
	<Container size="lg" pt={20}>
		<SimpleGrid
			cols={{ base: 1, sm: 1, md: 1, lg: 2 }}
			spacing={{ base: 10, sm: 'xl' }}
			verticalSpacing={{ base: 'xl', sm: 'xl' }}>
			{/* Visa produkter */}
			<div>
				<Text size="lg" fw={400} mb={15}>
					Produkter:
				</Text>
				{products.map((product, index) => (
					<ul className={classes.ProductOverviewList} key={index}>
						<li>
							<Text fw={500}>{product.name}</Text>
							<Text>Antal: {product.quantity}</Text>
							<Text>Pris: {product.price} SEK</Text>
						</li>
					</ul>
				))}
			</div>
			{/* Visa användaruppgifter */}
			<div className={classes.UserInfoOverview}>
				<Text size="lg" fw={400} mb={15}>
					Dina uppgifter:
				</Text>
				<Box className={classes.UserInfoOverviewText}>
					<Text fw={400} mb={10}>
						<span className={classes.UserInfoLabel}>Förnamn:</span>{' '}
						{userData.name}
					</Text>
					<Text mb={10}>
						<span className={classes.UserInfoLabel}>E-post:</span>{' '}
						{userData.email}
					</Text>
					<Text mb={10}>
						<span className={classes.UserInfoLabel}>Telefon:</span>{' '}
						{userData.phoneNumber}
					</Text>
					<Text fw={400} mb={10}>
						<span className={classes.UserInfoLabel}>Adress:</span>{' '}
						{userData.address.address}
					</Text>
					<Text mb={10}>
						<span className={classes.UserInfoLabel}>Postnummer:</span>{' '}
						{userData.address.postalCode}
					</Text>
					<Text mb={10}>
						<span className={classes.UserInfoLabel}>Ort:</span>{' '}
						{userData.address.city}
					</Text>
				</Box>
			</div>
		</SimpleGrid>
	</Container>
)

export default CheckoutStepper
