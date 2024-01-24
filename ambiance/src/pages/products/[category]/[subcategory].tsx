// pages/[category]/[subcategory].tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProductList from '../../../components/ProductList/ProductList'
import {
	Box,
	Button,
	Overlay,
	Title,
	Text,
	Container,
	UnstyledButton,
	Group,
	Center,
	Menu,
	Divider,
} from '@mantine/core'
import classes from '../../../styles/ProductPage.module.css'
import { ProductModel } from '@/models/Product'
import Link from 'next/link'
import { MdArrowBackIosNew, MdFilterListAlt } from 'react-icons/md'
import { SlArrowLeft } from 'react-icons/sl'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { CiFilter } from 'react-icons/ci'
import { IoFilterOutline } from 'react-icons/io5'
import FilterDrawer from '@/components/FilterDrawer/FilterDrawer'

const SubcategoryPage: React.FC = () => {
	const router = useRouter()
	const { category, subcategory } = router.query
	const [products, setProducts] = useState<ProductModel[]>([])
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
				<Overlay color="#000" opacity={0.85} zIndex={1} />
				<div className={classes.inner}>
					<Title tt="capitalize" className={classes.title}>
						{subcategory}
					</Title>
					<Container size="lg">
						<Text className={classes.text}>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
							accusantium nisi mollitia beatae, quidem explicabo.
						</Text>
					</Container>
					<div className={classes.innerButtonContainer}>
						<Link href={`/products/${category}`}>
							<Button
								className={classes.backButton}
								variant="filled"
								size="md"
								radius="xs">
								<IoIosArrowBack className={classes.ArrowIcon} />
								Tillbaka till {category}
							</Button>
						</Link>
					</div>
				</div>
			</Box>
			<Container size="xl" pt={35} pb={35}>
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
			</Container>
			{/* <Container size="xxl">
				<Divider />
			</Container> */}

			<ProductList products={products} />
		</>
	)
}

export default SubcategoryPage
