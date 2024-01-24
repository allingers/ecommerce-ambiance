// pages/[category]/[subcategory].tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProductList from '../../../components/ProductList/ProductList'
import { Box, Title } from '@mantine/core'
import classes from '../../../styles/ProductPage.module.css'
import { ProductModel } from '@/models/Product'

const SubcategoryPage: React.FC = () => {
	const router = useRouter()
	const { category, subcategory } = router.query
	const [products, setProducts] = useState<ProductModel[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('/api/products')
				if (response.ok) {
					const data: ProductModel[] = await response.json()

					// Filtrera produkter baserat på huvudkategorin och underkategorin
					const filteredProducts = data.filter(
						(product) =>
							product.categories.main.toString() === category &&
							product.categories.sub.toString() === subcategory,
					)

					setProducts(filteredProducts)
				} else {
					setError('Error fetching products')
				}
			} catch (error) {
				console.error('Error fetching products:', error)
				setError('Error fetching products')
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [category, subcategory])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	const getBackgroundImage = () => {
		if (typeof subcategory === 'string') {
			return `url(/backgrounds/${subcategory}.jpg)`
		}

		return `url(/backgrounds/default.jpg)`
	}

	return (
		<>
			<Box
				className={classes.wrapper}
				style={{ backgroundImage: getBackgroundImage() }}>
				<div className={classes.inner}>
					<Title tt="capitalize" className={classes.title}>
						{subcategory}
					</Title>
				</div>
			</Box>
			<ProductList products={products} />
		</>
	)
}

export default SubcategoryPage
