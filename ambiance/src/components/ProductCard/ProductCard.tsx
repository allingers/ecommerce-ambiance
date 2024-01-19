// ProductCard.tsx
import React, { useState } from 'react'
import { Card, Text, Image, Group } from '@mantine/core'
import classes from './ProductCard.module.css'
import { TbHeart, TbShoppingBag } from 'react-icons/tb'
import { ProductModel } from '@/models/Product'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

interface ProductCardProps {
	product: ProductModel
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const [isHovered, setIsHovered] = useState(false)
	const { addToCart } = useCart()

	const handleHover = () => {
		setIsHovered(true)
	}

	const handleLeave = () => {
		setIsHovered(false)
	}

	const handleAddToCart = () => {
		// Anropa addToCart-funktionen från useCart och skicka med produktens id och kvantitet
		addToCart(product._id, 1, product.price) // Här används 1 som standardkvantitet, du kan anpassa den beroende på ditt behov
		console.log(`Produkt med id ${product._id} lades till i varukorgen.`)
	}

	return (
		<>
			<Link href={`/product/${product._id}`}>
				<Card
					className={classes.card}
					shadow="xs"
					radius="xs"
					padding="xl"
					h={473.55}
					w={358.75}
					onMouseEnter={handleHover}
					onMouseLeave={handleLeave}>
					<Card.Section pl={10} color="#8b8989">
						<Text fw={400} size="xs" mt="md">
							{product.brand}
						</Text>
					</Card.Section>
					<Card.Section className={classes.imageSection}>
						{product.imageUrls && product.imageUrls.length > 0 && (
							<Image
								className={`${classes.cardImage} ${isHovered ? classes.hovered : ''}`}
								src={isHovered ? product.imageUrls[1] : product.imageUrls[0]}
								alt={product.name}
								fit={isHovered ? 'cover' : 'contain'}
								height={isHovered ? '300' : '250'}
							/>
						)}
					</Card.Section>
					<Group justify="space-between" mt="md">
						<Card.Section pl={10} mb={10}>
							<Text fw={450} size="lg" mt="xs" className={classes.ProductTitle}>
								{' '}
								{product.name}
							</Text>
							<Text fw={500} size="md">
								{product.price} SEK
							</Text>
						</Card.Section>
						<Card.Section className={classes.iconSection} pl={10} mb={10}>
							<Text
								className={classes.cartIcon}
								onClick={handleAddToCart}
								role="button"
								aria-label="Add to Cart">
								<TbShoppingBag />
							</Text>
							<Text className={classes.favIcon}>
								<TbHeart />
							</Text>
						</Card.Section>
					</Group>
				</Card>
			</Link>
		</>
	)
}

export default ProductCard
