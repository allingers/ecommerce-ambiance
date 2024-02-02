// CartOverview.tsx
import React from 'react'
import { Container, SimpleGrid, Image, Text } from '@mantine/core'
import classes from './Checkout.module.css'
import { Product } from './CheckoutStepper'

interface CartOverviewProps {
	products: Product[]
}

const CartOverview: React.FC<CartOverviewProps> = ({ products }) => {
	return (
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
}

export default CartOverview
