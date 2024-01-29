// components/ProductDetail.tsx
import React from 'react'
import { ProductModel } from '@/models/Product'
import { Carousel } from '@mantine/carousel'
import classes from './SingleProduct.module.css'
import {
	Text,
	Center,
	Container,
	Image,
	SimpleGrid,
	Title,
	Divider,
	Button,
	UnstyledButton,
	Card,
	Group,
	rem,
} from '@mantine/core'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { useCart } from '@/contexts/CartContext'
import { BsHandbag } from 'react-icons/bs'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import Link from 'next/link'
import { useFavorites } from '@/contexts/FavoritesContext'
import { TbHeart } from 'react-icons/tb'

interface ProductDetailProps {
	product: ProductModel
	relatedProducts: ProductModel[]
	recommendedProducts: ProductModel[]
}

const SingleProduct: React.FC<ProductDetailProps> = ({
	product,
	relatedProducts,
	recommendedProducts,
}) => {
	const { addToCart } = useCart()
	const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

	const handleAddToCart = (productToAdd: ProductModel) => {
		// Anropa addToCart-funktionen från useCart och skicka med produktens id och kvantitet
		addToCart(productToAdd._id, 1, productToAdd.price) // Här används 1 som standardkvantitet, du kan anpassa den beroende på ditt behov
		console.log(`Produkt med id ${productToAdd._id} lades till i varukorgen.`)
	}

	const handleAddToFavorites = () => {
		if (isFavorite(product._id)) {
			removeFromFavorites(product._id)
		} else {
			addToFavorites(product._id)
		}
	}

	const handleAddRelatedToFavorites = (relatedProductId: string) => {
		if (isFavorite(relatedProductId)) {
			removeFromFavorites(relatedProductId)
		} else {
			addToFavorites(relatedProductId)
		}
	}

	const handleAddRecommendedToFavorites = (recommendedProductId: string) => {
		if (isFavorite(recommendedProductId)) {
			removeFromFavorites(recommendedProductId)
		} else {
			addToFavorites(recommendedProductId)
		}
	}
	return (
		<>
			<Container>
				<Center>
					<SimpleGrid
						className={classes.wrapper}
						cols={{ base: 1, md: 2, sm: 2 }}
						spacing={{ base: 10, sm: 'xl' }}>
						<div className={classes.CarouselContainer}>
							<Carousel
								height={400}
								w={400}
								loop
								withIndicators
								controlSize={30}
								nextControlIcon={<MdArrowForwardIos />}
								previousControlIcon={<MdArrowBackIosNew />}
								controlsOffset={'xs'}>
								{product.imageUrls.map((url, index) => (
									<Carousel.Slide key={index}>
										<Image
											h={400}
											fit="cover"
											src={url}
											alt={`Product Image ${index + 1}`}
										/>
									</Carousel.Slide>
								))}
							</Carousel>
						</div>
						<div className={classes.ProductInfo}>
							<Text tt="uppercase" c="dimmed" size="sm" pb={5}>
								{product.brand}
							</Text>
							<Title className={classes.ProductTitle} fw={500} order={2}>
								{product.name}
							</Title>
							<Text className={classes.text} pt={15}>
								{product.description}
							</Text>
							<Text className={classes.text} fw={'bold'} mt={10} fz={'xl'}>
								{product.price} SEK
							</Text>
							{/* <Text>I Lager {product.inStock} st</Text> */}
							<div className={classes.ButtonContainer}>
								<Button
									className={classes.CartButton}
									onClick={() => handleAddToCart(product)}
									variant="filled"
									size="lg">
									Lägg i varukorgen
								</Button>
								<UnstyledButton
									className={classes.HeartButton}
									onClick={handleAddToFavorites}
									size="lg"
									color="palevioletred">
									{isFavorite(product._id) ? (
										<GoHeartFill className={classes.favIconFilled} />
									) : (
										<TbHeart />
									)}
								</UnstyledButton>
							</div>
							<Text tt="uppercase" c="dimmed" size="xs" mt={30} ml={2}>
								{' '}
								Kategori: {product.categories.main} - Underkategori:{' '}
								{product.categories.sub}
							</Text>
						</div>
					</SimpleGrid>
				</Center>
			</Container>
			<Container size={'xl'}>
				<Title className={classes.title} order={3} fw={500} ml={5}>
					Andra köpte också:
				</Title>
				<SimpleGrid
					cols={{ base: 1, sm: 2, lg: 3 }}
					spacing={{ base: 10, sm: 'sm' }}
					verticalSpacing={{ base: 'xs', sm: 'xl' }}>
					{relatedProducts.map((relatedProduct) => (
						<div
							key={relatedProduct._id}
							className={classes.RelatedProductContainer}>
							<Card withBorder radius="xs" p={0} className={classes.card}>
								<Group wrap="nowrap" gap={0}>
									<Link href={`/product/${relatedProduct._id}`}>
										<Image
											height={60}
											ml={10}
											src={relatedProduct.imageUrls[0]}
											alt={`Related Product Image`}
										/>
									</Link>
									<div className={classes.body}>
										<Text tt="uppercase" c="dimmed" fw={600} size="xs">
											{relatedProduct.brand}
										</Text>
										<Link href={`/product/${relatedProduct._id}`}>
											<Text className={classes.ProductTitle} mt="xs" mb="xs">
												{relatedProduct.name}
											</Text>
										</Link>
										<Group wrap="nowrap" gap="xs">
											<Text fz={'sm'} fw={'500'}>
												{relatedProduct.price} SEK
											</Text>
										</Group>
									</div>
									<div className={classes.IconContainer}>
										<UnstyledButton
											className={classes.CartIconButton}
											onClick={() => handleAddToCart(relatedProduct)}>
											<span className={classes.CartIconSpan}>
												<BsHandbag />
											</span>
										</UnstyledButton>
										<UnstyledButton
											className={classes.HeartIconButton}
											onClick={() =>
												handleAddRelatedToFavorites(relatedProduct._id)
											}>
											{isFavorite(relatedProduct._id) ? (
												<span className={classes.FilledHeartIconSpan}>
													<GoHeartFill />
												</span>
											) : (
												<span className={classes.HeartIconSpan}>
													<GoHeart />
												</span>
											)}
										</UnstyledButton>
									</div>
								</Group>
							</Card>
						</div>
					))}
				</SimpleGrid>
			</Container>
			<Divider />
			<Container size={'xl'} className={classes.RecommendedContainer}>
				<Title
					className={classes.title}
					ta={'center'}
					order={1}
					pt={35}
					pb={30}
					fw={300}>
					Rekommenderas för dig
				</Title>
				<Center>
					<SimpleGrid
						cols={{ base: 1, sm: 2, lg: 4 }}
						spacing={{ base: 10, sm: 'sm' }}
						verticalSpacing={{ base: 'md', sm: 'xl' }}>
						{recommendedProducts.map((recommendedProduct) => (
							<div key={recommendedProduct._id}>
								<Card
									className={classes.RecommendedCard}
									withBorder
									shadow="xs"
									radius="xs"
									padding="lg"
									h={300}
									w={250.75}>
									<Card.Section pl={15} color="#8b8989">
										<Text fw={400} size="xs" mt="md">
											{recommendedProduct.brand}
										</Text>
									</Card.Section>
									<Link href={`/product/${recommendedProduct._id}`}>
										<Card.Section className={classes.imageSection}>
											<Image
												height={150}
												fit="contain"
												mt={20}
												src={recommendedProduct.imageUrls[0]}
												alt={`Related Product Image`}
											/>
										</Card.Section>
									</Link>
									<Group justify="space-between" mt="md">
										<Card.Section pl={15} mb={10}>
											<Link href={`/product/${recommendedProduct._id}`}>
												<Text
													className={classes.recommendedProductName}
													fw={450}
													size="md"
													mt="xs">
													{recommendedProduct.name}
												</Text>
											</Link>
											<Text fw={500} size="md">
												{recommendedProduct.price} SEK
											</Text>
										</Card.Section>
										<Card.Section className={classes.iconSection} mb={10}>
											<Text
												className={classes.cartIcon}
												onClick={() => handleAddToCart(recommendedProduct)}
												role="button"
												aria-label="Add to Cart">
												<BsHandbag />
											</Text>
											<Text
												className={classes.favIcon}
												onClick={() =>
													handleAddRecommendedToFavorites(
														recommendedProduct._id,
													)
												}>
												{isFavorite(recommendedProduct._id) ? (
													<GoHeartFill className={classes.favIconFilled} />
												) : (
													<TbHeart />
												)}
											</Text>
										</Card.Section>
									</Group>
								</Card>
							</div>
						))}
					</SimpleGrid>
				</Center>
			</Container>
		</>
	)
}

export default SingleProduct
