import React, { useEffect, useState } from 'react'
import useFavorites from '@/hooks/useFavorites'
import { ProductModel } from '@/models/Product'
import classes from './FavList.module.css'
import { Image, Text } from '@mantine/core'
import { IoIosRemoveCircleOutline } from 'react-icons/io'

const FavList: React.FC = () => {
	const { favorites, updateFavorites } = useFavorites()
	const [products, setProducts] = useState<ProductModel[]>([])

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
		// Hämta produktinformation när komponenten mountar eller favoriterna ändras
		fetchProductDetails()
	}, [favorites])

	const removeFromFavorites = (productId: string) => {
		// Ta bort produkt från favoriter
		const newFavorites = favorites.filter((id) => id !== productId)
		updateFavorites(newFavorites)
	}

	return (
		<div className={classes.FavoritesContainer}>
			{favorites.length > 0 ? (
				favorites.map((productId) => {
					// Hitta produkten i listan av produkter
					const product = products.find((p) => p._id === productId)

					return (
						<div key={productId} className={classes.FavoriteItem}>
							{product && (
								<>
									<IoIosRemoveCircleOutline
										className={classes.RemoveButtonIcon}
										onClick={() => removeFromFavorites(productId)}
									/>

									<Image
										src={product.imageUrls[0]}
										alt={product.name}
										w={50}
										height={50}
										className={classes.image}
									/>

									<Text className={classes.name}>{product.name}</Text>
									<Text className={classes.price}>{product.price} SEK</Text>
								</>
							)}
						</div>
					)
				})
			) : (
				<Text className={classes.EmptyFavoritesMessage}>
					Du har inte lagt till några favoriter
				</Text>
			)}
		</div>
	)
}

export default FavList
