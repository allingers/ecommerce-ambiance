//FavList.tsx (Favoritlista)
import React, { useEffect, useState } from 'react'
import classes from './FavList.module.css'
import { Image, Text } from '@mantine/core'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { useFavorites } from '@/contexts/FavoritesContext'

interface IProductModel {
	_id: string
	name: string
	price: number
	imageUrls: string[]
}

const FavList: React.FC = () => {
	const { favoriteItems, removeFromFavorites } = useFavorites()
	const [products, setProducts] = useState<IProductModel[]>([])

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await fetch('/api/products')
				const data: IProductModel[] = await response.json()
				setProducts(data)
			} catch (error) {
				console.error('Error fetching product details:', error)
			}
		}

		fetchProductDetails()
	}, [])

	return (
		<div className={classes.FavoritesContainer}>
			{favoriteItems.length > 0 ? (
				favoriteItems.map((favoriteItem) => {
					// Hitta produkten i listan av produkter
					const product = products.find((p) => p._id === favoriteItem.productId)

					return (
						<div key={favoriteItem.productId} className={classes.FavoriteItem}>
							{product && (
								<>
									<IoIosRemoveCircleOutline
										className={classes.RemoveButtonIcon}
										onClick={() => removeFromFavorites(product._id)}
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
