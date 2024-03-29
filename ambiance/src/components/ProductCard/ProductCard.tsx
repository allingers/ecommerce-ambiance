// ProductCard.tsx (Produktkort)
import React, { useState } from 'react'
import { Card, Text, Image, Group } from '@mantine/core'
import classes from './ProductCard.module.css'
import { TbHeart, TbShoppingBag } from 'react-icons/tb'
import { ProductModel } from '@/models/Product'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { GoHeartFill } from 'react-icons/go'
import { useFavorites } from '@/contexts/FavoritesContext'

interface ProductCardProps {
	product: ProductModel
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const [isHovered, setIsHovered] = useState(false)
	const { addToCart } = useCart()
	const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

	const handleHover = () => {
		setIsHovered(true)
	}

	const handleLeave = () => {
		setIsHovered(false)
	}

	const handleAddToCart = () => {
		// Anropar addToCart-funktionen från useCart/CartContext
		addToCart(product._id, 1, product.price, product.name, product.imageUrls[0])

		console.log(`Produkt med id ${product._id} lades till i varukorgen.`)
	}

	const handleAddToFavorites = () => {
		if (isFavorite(product._id)) {
			removeFromFavorites(product._id)
		} else {
			addToFavorites(product._id)
		}
	}

	return (
		<>
			<Card
				className={classes.card}
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
				<Link href={`/product/${product._id}`}>
					<Card.Section className={classes.imageSection}>
						{product.imageUrls && product.imageUrls.length > 0 && (
							<Image
								className={`${classes.cardImage} ${isHovered ? classes.hovered : ''}`}
								src={
									isHovered && product.imageUrls[1]
										? product.imageUrls[1]
										: product.imageUrls[0]
								}
								alt={product.name}
								fit={isHovered ? 'cover' : 'contain'}
								height={isHovered ? '300' : '250'}
							/>
						)}
					</Card.Section>
				</Link>
				<Group justify="space-between" mt="md">
					<Card.Section pl={10} mb={10}>
						<Link href={`/product/${product._id}`}>
							<Text fw={450} size="lg" mt="xs" className={classes.ProductTitle}>
								{' '}
								{product.name}
							</Text>
						</Link>
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
						<Text
							className={classes.favIcon}
							onClick={handleAddToFavorites}
							role="button"
							aria-label="Add to Favorites">
							{isFavorite(product._id) ? (
								<GoHeartFill className={classes.favIconFilled} />
							) : (
								<TbHeart />
							)}
						</Text>
					</Card.Section>
				</Group>
			</Card>
		</>
	)
}

export default ProductCard
