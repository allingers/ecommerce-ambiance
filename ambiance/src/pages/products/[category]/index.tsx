// pages/products/[category]/index.tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProductList from '../../../components/ProductList/ProductList'
import { Box, Button, Overlay, Title, Flex } from '@mantine/core'
import classes from '../../../styles/ProductPage.module.css'
import { ProductModel } from '@/models/Product'
import { SubcategoryModel } from '@/models/Subcategory'

const CategoryPage: React.FC = () => {
	const router = useRouter()
	const { category } = router.query
	const [products, setProducts] = useState<ProductModel[]>([])
	const [subcategories, setSubcategories] = useState<SubcategoryModel[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchProductsAndSubcategories = async () => {
			try {
				const productsResponse = await fetch('/api/products')
				const productsData: ProductModel[] = await productsResponse.json()

				const subcategoriesResponse = await fetch('/api/subcategories')
				const subcategoriesData: SubcategoryModel[] =
					await subcategoriesResponse.json()

				setProducts(productsData)
				setSubcategories(subcategoriesData)

				// Filtrera produkter baserat på huvudkategori
				const filteredProducts = productsData.filter(
					(product) => product.categories.main.toString() === category,
				)

				setProducts(filteredProducts)
			} catch (error) {
				console.error('Error fetching data:', error)
				setError('Error fetching data')
			} finally {
				setLoading(false)
			}
		}

		fetchProductsAndSubcategories()
	}, [category])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	const filteredSubcategories = subcategories.filter(
		(subcategory) => subcategory.parentCategory.toString() === category,
	)

	const getBackgroundImage = () => {
		if (typeof category === 'string') {
			return `url(/backgrounds/${category}.jpg)`
		}

		return `url(/backgrounds/default.jpg)`
	}

	return (
		<>
			<Box
				className={classes.wrapper}
				style={{ backgroundImage: getBackgroundImage() }}>
				<Overlay color="#000" opacity={0.65} zIndex={1} />
				<div className={classes.inner}>
					<Title tt="capitalize" className={classes.title}>
						{category}
					</Title>
				</div>
			</Box>
			<Box className={classes.btnBox}>
				<Flex
					mih={60}
					gap="xl"
					justify="center"
					align="center"
					direction="row"
					wrap="wrap">
					{filteredSubcategories.map((subcategory) => (
						<Button
							variant="outline"
							color="rgba(18, 18, 18, 1)"
							radius="xs"
							key={subcategory._id}
							onClick={() =>
								router.push(
									`/products/${category}/${subcategory.name.toLowerCase()}`,
								)
							}>
							{subcategory.name}
						</Button>
					))}
				</Flex>
			</Box>
			<ProductList products={products} />
		</>
	)
}

export default CategoryPage
