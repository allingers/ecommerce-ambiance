//OrderInformation.tsx
// Steg 3 i Stepper-komponenten - Beställningsöversikt
import React from 'react'
import { Container, SimpleGrid, Text, Box, Checkbox } from '@mantine/core'
import { Product, UserData } from './CheckoutStepper'
import { useSession } from 'next-auth/react'
import classes from './Checkout.module.css'

interface OrderInformationProps {
	products: Product[]
	userData: UserData
	saveUserInfo: boolean
	setSaveUserInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const OrderInformation: React.FC<OrderInformationProps> = ({
	products,
	userData,
	saveUserInfo,
	setSaveUserInfo,
}) => {
	const { data: session } = useSession()

	return (
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
				{/* Inloggad användare kan spara information inför kommande köp */}
				{session && (
					<Checkbox
						defaultChecked={saveUserInfo}
						label="Spara mina uppgifter inför kommande köp"
						color="lime"
						onChange={() => setSaveUserInfo(!saveUserInfo)}
					/>
				)}
			</SimpleGrid>
		</Container>
	)
}

export default OrderInformation
