import React, { useEffect, useRef, useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import {
	Drawer,
	Title,
	Text,
	Image,
	Divider,
	rem,
	ActionIcon,
	NumberInput,
	Box,
	Button,
} from '@mantine/core'
import { ProductModel } from '@/models/Product'
import classes from './CartDrawer.module.css'
import { PiMinusThin, PiPlusThin } from 'react-icons/pi'
import { useRouter } from 'next/router'

interface CartDrawerProps {
	isOpen: boolean
	onClose: () => void
	products: ProductModel[]
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
	const [products, setProducts] = useState<ProductModel[]>([])
	const {
		cartItems,
		updateCartItemQuantity,
		removeCartItem,
		calculateCartTotal,
	} = useCart()
	const router = useRouter()
	const fetchProductDetails = async () => {
		try {
			const response = await fetch('/api/products')
			const data = await response.json()
			setProducts(data)
		} catch (error) {
			console.error('Error fetching product details:', error)
		}
	}

	useEffect(() => {
		// Hämta produktinformation när komponenten mountar eller när cartItems ändras
		fetchProductDetails()
	}, [cartItems])

	const handleCheckout = () => {
		// Navigera till checkout-sidan när användaren klickar på "Gå till kassan"
		router.push('/checkout')
		onClose()
	}

	return (
		<Drawer
			opened={isOpen}
			onClose={onClose}
			position="right"
			size="md"
			offset={5}>
			<Title className={classes.cartTitle} order={3}>
				Varukorg
			</Title>
			<Divider />
			<Drawer.Body>
				{cartItems &&
					cartItems.map((item, index) => {
						const product = products.find((p) => p._id === item.productId)

						if (!product) {
							return null // Skip rendering if product is not found
						}

						const handleQuantityChange = (value: string | number) => {
							const quantity =
								typeof value === 'string' ? parseInt(value, 10) : value

							if (quantity < 1) {
								// Anropa removeCartItem om antalet är mindre än 1
								removeCartItem(item.productId)
							} else {
								// Annars uppdatera antalet som vanligt
								updateCartItemQuantity(item.productId, quantity)
							}
						}

						return (
							<div key={index} className={classes.cartItemContainer}>
								<div className={classes.cartItem}>
									<Image
										src={product.imageUrls[0]}
										alt={product.name}
										width={80}
										height={80}
										className={classes.image}
									/>
									<Text className={classes.name}>{product.name}</Text>
									<Text className={classes.price}>{product.price} SEK</Text>
								</div>
								<div className={classes.quantityContainer}>
									<ActionIcon
										size={34}
										variant="default"
										onClick={() => handleQuantityChange(item.quantity - 1)}>
										<PiMinusThin style={{ width: rem(14), height: rem(24) }} />
									</ActionIcon>
									<div className={classes.quantityNumber}>
										<NumberInput
											value={item.quantity}
											onChange={(value) => handleQuantityChange(value)}
											variant="unstyled"
											hideControls
											min={1}
											h={10}
											w={20}
											ml={10}
										/>
									</div>
									<ActionIcon
										size={34}
										variant="default"
										onClick={() => handleQuantityChange(item.quantity + 1)}>
										<PiPlusThin style={{ width: rem(14), height: rem(24) }} />
									</ActionIcon>
								</div>
							</div>
						)
					})}
			</Drawer.Body>
			<Box className={classes.drawerFooter}>
				<Text className={classes.CartTotal}>
					Totalsumma: {calculateCartTotal()} SEK
				</Text>
				<Button className={classes.CheckoutButton} onClick={handleCheckout}>
					Gå till kassan{' '}
				</Button>
			</Box>
		</Drawer>
	)
}

export default CartDrawer
