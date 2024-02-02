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
	Menu,
	Loader,
} from '@mantine/core'
import classes from '../../../styles/ProductPage.module.css'
import { ProductModel } from '@/models/Product'
import Link from 'next/link'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { IoFilterOutline } from 'react-icons/io5'
import FilterDrawer from '@/components/FilterDrawer/FilterDrawer'
import { useFilterContext } from '@/contexts/FilterContext'

const SubcategoryPage: React.FC = () => {
	const router = useRouter()
	const { category, subcategory } = router.query
	const [products, setProducts] = useState<ProductModel[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const {
		selectedPriceRange,
		setSelectedPriceRange,
		selectedBrands,
		setSelectedBrands,
		selectedColors,
		setSelectedColors,
		allBrands,
		setAllBrands,
		allColors,
		setAllColors,
		resetFilters,
		filtersCurrentlyApplied,
	} = useFilterContext()

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

					// Hämtar alla varumärken från produkterna - skickas som prop till filterDrawer
					const uniqueBrands = [
						...new Set(data.map((product) => product.brand)),
					]
					setAllBrands(uniqueBrands)

					// Hämta alla färger från produkterna - skickas som prop till FilterDrawer
					const uniqueColors = [
						...new Set(data.map((product) => product.color)),
					]
					setAllColors(uniqueColors)

					// Filtrering
					const filteredProducts = data.filter(
						(product) =>
							product.categories.main.toString() === category &&
							product.categories.sub.toString() === subcategory &&
							product.price >= selectedPriceRange[0] &&
							product.price <= selectedPriceRange[1] &&
							(selectedBrands.length === 0 ||
								selectedBrands.includes(product.brand)) &&
							(selectedColors.length === 0 ||
								selectedColors.includes(product.color)),
					)

					setProducts(filteredProducts)
					console.log(filteredProducts)
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
	}, [
		category,
		subcategory,
		selectedPriceRange,
		selectedBrands,
		selectedColors,
	])

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

	const formatSubcategory = (subcategory: string | string[] | undefined) => {
		// Kontrollera om subcategory är definierad innan du försöker använda den
		if (subcategory) {
			// Om subcategory är en sträng, ersätt bindestreck med mellanslag
			if (typeof subcategory === 'string') {
				return subcategory.replace(/-/g, ' ')
			}

			// Om subcategory är en array, joina elementen med mellanslag
			if (Array.isArray(subcategory)) {
				return subcategory.join(' ')
			}
		}

		// Returnera en tom sträng om subcategory är undefined eller annars inte matchar förväntade typer
		return ''
	}

	return (
		<>
			<Box
				className={classes.wrapper}
				style={{ backgroundImage: getBackgroundImage() }}>
				<Overlay color="#000" opacity={0.85} zIndex={1} />
				<div className={classes.inner}>
					{loading && (
						<div>
							<Loader color="gray" type="dots" />
						</div>
					)}
					<Title tt="capitalize" className={classes.title}>
						{formatSubcategory(subcategory)}
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
								tt="capitalize"
								className={classes.backButton}
								variant="filled"
								size="md"
								radius="xs">
								<IoIosArrowBack className={classes.ArrowIcon} />
								Tillbaka till {formatSubcategory(category)}
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
					<FilterDrawer
						isOpen={isDrawerOpen}
						onClose={handleCloseDrawer}
						brands={allBrands}
						colors={allColors}
					/>
					<div className={classes.groupContainer}>
						{filtersCurrentlyApplied && (
							<UnstyledButton onClick={resetFilters}>
								Rensa filter
							</UnstyledButton>
						)}
						<Text className={classes.groupText}>
							{products.length} produkter
						</Text>
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
			<div>
				{loading ? (
					<div>
						{' '}
						<Loader color="gray" type="dots" />
					</div>
				) : (
					<>
						<ProductList products={products} />
					</>
				)}
			</div>
		</>
	)
}

export default SubcategoryPage
