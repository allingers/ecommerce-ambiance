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
} from '@mantine/core'
import classes from './Checkout.module.css'

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

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({
	isOpen,
	onClose,
}) => {
	const [activeStep, setActiveStep] = useState(1)
	const [cartProducts, setCartProducts] = useState<Product[]>([])

	useEffect(() => {
		// Hämta produkter från localStorage när komponenten mountar
		const storedCartProducts = localStorage.getItem('cart')
		const cartProductsFromStorage: Product[] = storedCartProducts
			? JSON.parse(storedCartProducts)
			: []
		setCartProducts(cartProductsFromStorage)
	}, [])

	const nextStep = () =>
		setActiveStep((current) => (current < 3 ? current + 1 : current))
	const prevStep = () =>
		setActiveStep((current) => (current > 1 ? current - 1 : current))

	return (
		<>
			<Container size="lg" pt={30}>
				<Stepper
					color="rgb(115, 153, 115"
					active={activeStep}
					onStepClick={setActiveStep}>
					<Stepper.Step label="Översikt" description="Kontrollera">
						{/* Visa översikt av produkter från localStorage */}
						<CartOverview products={cartProducts} />
					</Stepper.Step>
					<Stepper.Step
						label="Användaruppgifter"
						description="Enter your details">
						{/* Formulär för användaruppgifter */}
					</Stepper.Step>
					<Stepper.Step label="Betalning" description="Payment details">
						{/* Simulering av betalning */}
					</Stepper.Step>
					<Stepper.Completed>
						Tack för din beställning! Klicka på "Back" för att ändra något.
					</Stepper.Completed>
				</Stepper>
			</Container>
			<Divider mt={15} />
			<Group justify="center" mt="xl">
				<Button
					className={classes.BackButton}
					variant="default"
					onClick={prevStep}>
					Tillbaka
				</Button>
				<Button className={classes.NextButton} onClick={nextStep}>
					Nästa steg
				</Button>
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

export default CheckoutStepper
