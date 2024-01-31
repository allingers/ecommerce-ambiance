import React, { useEffect, useState } from 'react'
import {
	Stepper,
	Button,
	Group,
	Container,
	Title,
	Image,
	Text,
	SimpleGrid,
	Divider,
	Input,
	TextInput,
	Box,
} from '@mantine/core'
import classes from './Checkout.module.css'
import { getSession } from 'next-auth/react'
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
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		address: {
			address: '',
			co: '',
			city: '',
			postalCode: '',
		},
	})
	const { calculateCartTotal } = useCart()

	useEffect(() => {
		// Hämta produkter från localStorage när komponenten mountar
		const storedCartProducts = localStorage.getItem('cart')
		const cartProductsFromStorage: Product[] = storedCartProducts
			? JSON.parse(storedCartProducts)
			: []
		setCartProducts(cartProductsFromStorage)

		// Hämta användaruppgifter från sessionsdata om användaren är inloggad
		const fetchSession = async () => {
			const session = await getSession()
			if (session) {
				setUserData({
					firstName: session.user.name,
					lastName: '',
					email: session.user.email,
					phoneNumber: '', // Fyll i användarens telefonnummer om det finns tillgängligt i sessionsdata
					address: {
						address: '', // Fyll i användarens adressuppgifter om det finns tillgängligt i sessionsdata
						co: '',
						city: '',
						postalCode: '',
					},
				})
			}
		}

		fetchSession()
	}, [])

	const nextStep = () => {
		// Kontrollera om användaren redan har slutfört steg 1 innan de går till steg 2
		if (activeStep === 1) {
			// Här kan du lägga till ytterligare logik om det behövs innan du går vidare till nästa steg
			// Exempel: validering, kontrollera om något är ifyllt, etc.
			// Om allt är okej, gå vidare till nästa steg
			setActiveStep((current) => (current < 4 ? current + 1 : current))
		} else if (activeStep === 3) {
			// Om det är steg 3, uppdatera userData och gå vidare till nästa steg
			setUserData((prevData) => ({
				...prevData,
				// Uppdatera userData med de värden som användaren har fyllt i formuläret
			}))

			setActiveStep((current) => (current < 4 ? current + 1 : current))
		} else if (activeStep < 4) {
			// Om det inte är steg 1 eller 3, gå vidare till nästa steg direkt
			setActiveStep((current) => current + 1)
		}
	}
	const prevStep = () =>
		setActiveStep((current) => (current > 1 ? current - 1 : current))

	const handlePayment = async () => {
		try {
			// Implementera betalningslogik här
			// Skicka användarens och produkternas data till servern för att slutföra betalningen
			const session = await getSession()

			if (session) {
				const userEmail = session.user?.email

				// Skapa en order och koppla den till användarens e-postadress
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
						// ... andra relevanta fält
					}),
				})

				const data = await response.json()

				if (response.ok) {
					console.log('Order created successfully')
					// Navigera till orderbekräftelsessidan
					router.push('/order-bekraftelse')
				} else {
					console.error('Error creating order:', data.message)
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
						<PaymentInformation products={cartProducts} userData={userData} />
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
					<Button
						className={classes.PayButton}
						onClick={handlePayment} // Lägg till din betalningsfunktion här
					>
						Lägg din order
					</Button>
				)}
			</Group>
		</>
	)
}

// Enkel komponent för att visa översikt av produkter
const CartOverview: React.FC<{ products: Product[] }> = ({ products }) => (
	<div>
		<Container size="lg" pt={20}>
			{/* <Title className={classes.Title} order={2}>
				Artiklar i varukorgen:
			</Title> */}

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

interface Address {
	address: string
	co?: string
	city: string
	postalCode: string
}

interface UserData {
	firstName: string
	lastName: string
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
						placeholder="Ange förnamn"
						required={true}
						value={userData.firstName}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								firstName: event.target.value,
							}))
						}
					/>
					<TextInput
						label="Efternamn"
						placeholder="Ange efternamn"
						required={true}
						value={userData.lastName}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								lastName: event.target.value,
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
						label="c/o"
						placeholder="Ange c/o (frivillig)"
						value={userData.address.co}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								co: event.target.value,
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

interface PaymentInformationProps {
	products: Product[]
	userData: UserData
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({
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
						{userData.firstName}
					</Text>
					<Text mb={10}>
						<span className={classes.UserInfoLabel}>Efternamn:</span>{' '}
						{userData.lastName}
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
