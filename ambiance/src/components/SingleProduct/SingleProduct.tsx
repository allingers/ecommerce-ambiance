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
} from '@mantine/core'
import { GoHeart } from 'react-icons/go'
import { useCart } from '@/contexts/CartContext'
import { BsHandbag } from 'react-icons/bs'

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

	const handleAddToCart = () => {
		// Anropa addToCart-funktionen från useCart och skicka med produktens id och kvantitet
		addToCart(product._id, 1, product.price) // Här används 1 som standardkvantitet, du kan anpassa den beroende på ditt behov
		console.log(`Produkt med id ${product._id} lades till i varukorgen.`)
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
							<Carousel height={400} w={400} loop withIndicators>
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
							<Text fw={'bold'} mt={10}>
								{product.price} SEK
							</Text>
							{/* <Text>I Lager {product.inStock} st</Text> */}
							<Text c="dimmed" size="sm" mt={10}>
								{' '}
								Kategori: {product.categories.main} - Underkategori:{' '}
								{product.categories.sub}
							</Text>
							<div className={classes.ButtonContainer}>
								<Button
									className={classes.CartButton}
									onClick={handleAddToCart}
									variant="filled"
									size="lg">
									Lägg i varukorgen
								</Button>
								<UnstyledButton
									className={classes.HeartButton}
									size="lg"
									color="palevioletred">
									<span className={classes.HeartIconSpan}>
										<GoHeart />
									</span>
									{/* <span className={classes.FilledHeartIconSpan}><GoHeartFill /></span>  */}
								</UnstyledButton>
							</div>
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
									<Image
										height={60}
										ml={10}
										src={relatedProduct.imageUrls[0]}
										alt={`Related Product Image`}
									/>
									<div className={classes.body}>
										<Text tt="uppercase" c="dimmed" fw={600} size="xs">
											{relatedProduct.brand}
										</Text>
										<Text className={classes.ProductTitle} mt="xs" mb="xs">
											{relatedProduct.name}
										</Text>
										<Group wrap="nowrap" gap="xs">
											<Text fw={'500'}>{relatedProduct.price} SEK</Text>
										</Group>
									</div>
									<div className={classes.IconContainer}>
										<UnstyledButton className={classes.CartIconButton}>
											<span className={classes.CartIconSpan}>
												<BsHandbag />
											</span>
										</UnstyledButton>
										<UnstyledButton className={classes.HeartIconButton}>
											<span className={classes.HeartIconSpan}>
												<GoHeart />
											</span>
											{/* <span className={classes.FilledHeartIconSpan}><GoHeartFill /></span> */}
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
						{recommendedProducts.map((recommendedProducts) => (
							<div key={recommendedProducts._id}>
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
											{recommendedProducts.brand}
										</Text>
									</Card.Section>
									<Card.Section className={classes.imageSection}>
										<Image
											height={150}
											fit="contain"
											mt={20}
											src={recommendedProducts.imageUrls[0]}
											alt={`Related Product Image`}
										/>
									</Card.Section>
									<Group justify="space-between" mt="md">
										<Card.Section pl={15} mb={10}>
											<Text fw={450} size="lg" mt="xs">
												{recommendedProducts.name}
											</Text>
											<Text fw={500} size="md">
												{recommendedProducts.price} SEK
											</Text>
										</Card.Section>
										<Card.Section className={classes.iconSection} mb={10}>
											<Text
												className={classes.cartIcon}
												onClick={handleAddToCart}
												role="button"
												aria-label="Add to Cart">
												<BsHandbag />
											</Text>
											<Text className={classes.favIcon}>
												<GoHeart />
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
