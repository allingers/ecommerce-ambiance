// pages/products/[category]/index.tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProductList from '../../../components/ProductList/ProductList'
import {
	Box,
	Button,
	Overlay,
	Title,
	Flex,
	Text,
	Container,
	UnstyledButton,
	Group,
	Menu,
	Divider,
} from '@mantine/core'
import classes from '../../../styles/ProductPage.module.css'
import { ProductModel } from '@/models/Product'
import { SubcategoryModel } from '@/models/Subcategory'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import Link from 'next/link'
import FilterDrawer from '@/components/FilterDrawer/FilterDrawer'
import { IoFilterOutline } from 'react-icons/io5'

const CategoryPage: React.FC = () => {
	const router = useRouter()
	const { category } = router.query
	const [products, setProducts] = useState<ProductModel[]>([])
	const [subcategories, setSubcategories] = useState<SubcategoryModel[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const handleOpenDrawer = () => {
		setIsDrawerOpen(true)
	}

	const handleCloseDrawer = () => {
		setIsDrawerOpen(false)
	}

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
				<Overlay color="#000" opacity={0.95} zIndex={1} />
				<div className={classes.inner}>
					<Title tt="capitalize" className={classes.title}>
						{category}
					</Title>
					<Container size="lg">
						<Text className={classes.text}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Perspiciatis ipsam deleniti molestias nesciunt reiciendis delectus
							impedit placeat eveniet esse fugiat.
						</Text>
					</Container>
					<div className={classes.innerButtonContainer}>
						<Link href={`/`}>
							<Button
								className={classes.backButton}
								variant="filled"
								size="md"
								radius="xs">
								<IoIosArrowBack className={classes.ArrowIcon} />
								Tillbaka till startsidan
							</Button>
						</Link>
					</div>
				</div>
			</Box>
			<Box className={classes.ButtonBox}>
				<Flex
					mih={60}
					gap="xl"
					justify="center"
					align="center"
					direction="row"
					wrap="wrap">
					{filteredSubcategories.map((subcategory) => (
						<Button
							size="md"
							variant="outline"
							color="rgba(18, 18, 18, 1)"
							radius="xs"
							className={classes.SubButton}
							key={subcategory._id}
							onClick={() =>
								router.push(
									`/products/${category}/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`,
								)
							}>
							{subcategory.name}
						</Button>
					))}
				</Flex>
			</Box>
			<Container size="xl" pt={20} pb={35}>
				<Group className={classes.group}>
					<UnstyledButton
						onClick={handleOpenDrawer}
						className={classes.filterButton}>
						Filtrera <IoFilterOutline className={classes.filterButtonIcon} />
					</UnstyledButton>
					<FilterDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
					<div className={classes.groupContainer}>
						<Text className={classes.groupText}> Antal produkter </Text>
						<Menu width={200} shadow="md" position="bottom-start">
							<Menu.Target>
								<UnstyledButton className={classes.sortButton}>
									Sortera på{' '}
									<IoIosArrowDown className={classes.sortButtonIcon} />
								</UnstyledButton>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item>Pris stigande</Menu.Item>
								<Menu.Item>Pris fallande</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</div>
				</Group>

				<Divider />
			</Container>
			<ProductList products={products} />
		</>
	)
}

export default CategoryPage
