import classes from '../styles/Home.module.css'
import cx from 'clsx'
import {
	Title,
	Text,
	Container,
	Button,
	Overlay,
	SimpleGrid,
	Center,
	Card,
	Input,
	Modal,
} from '@mantine/core'
import { ChangeEvent, useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard/ProductCard'
import { ProductModel } from '@/models/Product'
import Link from 'next/link'
import { useDisclosure } from '@mantine/hooks'

const Home: React.FC = () => {
	const [randomProducts, setRandomProducts] = useState<ProductModel[]>([])
	const [textilProducts, setTextilProducts] = useState<ProductModel[]>([])
	const [email, setEmail] = useState('')
	const [error, setError] = useState('')
	const [opened, { open, close }] = useDisclosure(false)

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		setEmail(inputValue)

		// Rensar error-meddelande när användaren ändrar e-postadress
		setError('')
	}

	const handleSubmit = () => {
		// Kontrollerar om det finns ett "@"-tecken i e-postadressen
		const isValid = /\S+@\S+\.\S+/.test(email)

		if (!isValid) {
			setError('Det måste vara en giltig e-postadress')
		} else {
			setError('')
			open() // Öppna modalen när e-postadressen är giltig
			setEmail('') //Rensar inputfältet
		}
	}

	useEffect(() => {
		// Anropar API-endpoint och hämtar 4 slumpmässiga produkter
		const fetchRandomProducts = async () => {
			try {
				const response = await fetch('/api/products/randomProducts')
				const data = await response.json()
				setRandomProducts(data)
			} catch (error) {
				console.error('Error fetching random products:', error)
			}
		}

		fetchRandomProducts()
	}, [])

	useEffect(() => {
		// Anropar API-endpoint och hämtar 8 textilprodukter
		const fetchTextilProducts = async () => {
			try {
				const response = await fetch('/api/products/textil')
				const data = await response.json()
				setTextilProducts(data)
			} catch (error) {
				console.error('Error fetching textil products:', error)
			}
		}

		fetchTextilProducts()
	}, [])

	return (
		<>
			{/* First section */}
			<div className={classes.wrapper}>
				<Overlay color="#000" opacity={0.65} zIndex={1} />

				<div className={classes.inner}>
					<Container size={640}>
						<Text tt="uppercase" className={classes.description}>
							Våra bästa priser på tidlös design
						</Text>
					</Container>
					<Title className={classes.title}>Toppsäljare till bästa pris!</Title>

					<div className={classes.controls}>
						<Link href={'/bestsellers'}>
							<Button
								className={cx(classes.control, classes.secondaryControl)}
								size="md">
								Fynda här!
							</Button>
						</Link>
					</div>
				</div>
			</div>
			{/* Popular products section */}
			<Container pt={35} pb={35} className={classes.PopularSection} size="xxl">
				<Center>
					<SimpleGrid
						cols={{ base: 1, sm: 2, md: 3, xl: 4 }}
						spacing={{ base: 10, sm: 'md' }}
						verticalSpacing={{ base: 'md', sm: 'xl' }}>
						{randomProducts.map((product) => (
							<div key={product._id}>
								<ProductCard product={product} />
							</div>
						))}
					</SimpleGrid>
				</Center>
			</Container>

			{/* Category hero */}
			<div className={classes.TextilCategoryWrapper}>
				<Overlay color="#000" opacity={0.25} zIndex={1} />
				<div className={classes.inner}>
					<Title tt="uppercase" className={classes.title}>
						Ge liv med textil
					</Title>
					<div className={classes.controls}>
						<Button
							className={cx(classes.control, classes.secondaryControl)}
							size="sm">
							<Link href="/products/textil">
								<span>Fynda här!</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>
			{/* Category Card section (textil) */}
			<Container pt={35} className={classes.CategoryCardSection} size="xxl">
				<Center>
					<SimpleGrid
						cols={{ base: 1, sm: 2, md: 2, xl: 4 }}
						spacing={{ base: 10, sm: 'md' }}
						verticalSpacing={{ base: 'md', sm: 'xl' }}>
						<div className={classes.cardContainer}>
							<Card
								className={classes.card}
								style={{
									backgroundImage:
										'url(https://royaldesign.se/image/1/chhatwal-jonsson-mahi-dhurry-matta-1?w=1920&quality=80)',
									backgroundSize: 'cover',
								}}>
								<div className={classes.ImageOverlay}></div>
								<div className={classes.TextContainer}>
									<Link href={'/products/textil/plädar-&-prydnadskuddar'}>
										<Text className={classes.CardTitle} ta="center">
											Plädar &
										</Text>
										<Text className={classes.CardTitle} ta="center">
											Prydnadskuddar
										</Text>
									</Link>
								</div>
							</Card>
						</div>

						<div className={classes.cardContainer}>
							<Card
								className={classes.card}
								style={{
									backgroundImage:
										'url(https://royaldesign.se/image/1/house-doctor-chindi-matta-vit-3?w=1920&quality=80)',
									backgroundSize: 'cover',
								}}>
								<div className={classes.ImageOverlay}></div>
								<div className={classes.TextContainer}>
									<Link href={'/products/textil/mattor'}>
										<Text className={classes.CardTitle} ta="center">
											Mattor
										</Text>
									</Link>
								</div>
							</Card>
						</div>

						<div className={classes.cardContainer}>
							<Card
								className={classes.card}
								style={{
									backgroundImage:
										'url(https://www.rum21.se/image/14/mimou-gardin-ellie-halvlinne-dubbel-bredd-vit-290x250-43?w=1920&quality=80)',
									backgroundSize: 'cover',
								}}>
								<div className={classes.ImageOverlay}></div>
								<div className={classes.TextContainer}>
									<Link href={'/products/textil/gardiner'}>
										<Text className={classes.CardTitle} ta="center">
											Gardiner
										</Text>
									</Link>
								</div>
							</Card>
						</div>

						<div className={classes.cardContainer}>
							<Card
								className={classes.card}
								style={{
									backgroundImage:
										'url(https://royaldesign.se/image/1/boeljan-mirja-bordsduk-150x260-cm-1?w=1920&quality=80)',
									backgroundSize: 'cover',
								}}>
								<div className={classes.ImageOverlay}></div>
								<div className={classes.TextContainer}>
									<Link href={'/products/textil/kökstextiler'}>
										<Text className={classes.CardTitle} ta="center">
											Kökstextil
										</Text>
									</Link>
								</div>
							</Card>
						</div>
					</SimpleGrid>
				</Center>
			</Container>
			{/* Textil products section */}
			<Container pt={35} className={classes.TextilSection} size="xxl">
				<Center>
					<SimpleGrid
						cols={{ base: 1, sm: 2, md: 3, xl: 4 }}
						spacing={{ base: 10, sm: 'md' }}
						verticalSpacing={{ base: 'md', sm: 'xl' }}>
						{textilProducts.map((product) => (
							<div key={product._id}>
								<ProductCard product={product} />
							</div>
						))}
					</SimpleGrid>
				</Center>
			</Container>
			{/* Double hero section */}
			<Container
				pt={35}
				pb={40}
				className={classes.DoubleHeroSection}
				size="xxl">
				<Center>
					<SimpleGrid
						cols={{ base: 1, md: 1, xl: 2 }}
						spacing={{ base: 10, sm: 'md' }}
						verticalSpacing={{ base: 'md', sm: 'xl' }}>
						<div className={classes.HeroCardContainer}>
							<Card
								className={classes.HeroCard}
								style={{
									backgroundImage:
										'url(https://www.rum21.se/image/14/tradition-flowerpot-vp3-bordslampa-5?w=1920&quality=80)',
									backgroundSize: 'cover',
								}}>
								<div className={classes.ImageOverlay}></div>
								<div className={classes.HeroTextContainer}>
									<Container size={640}>
										<Text tt="uppercase" className={classes.HeroDescription}>
											Bordslampor
										</Text>
									</Container>
									<Link href={'/product/65b0d88fda352956225983e9'}>
										<Text className={classes.HeroCardTitle}>Flowerpot VP3</Text>
									</Link>
								</div>
							</Card>
						</div>

						<div className={classes.HeroCardContainer}>
							<Card
								className={classes.HeroCard}
								style={{
									backgroundImage:
										'url(https://www.rum21.se/image/14/tell-me-more-frost-ljuslykta-amber-4?w=1920&quality=80)',
									backgroundSize: 'cover',
								}}>
								<div className={classes.ImageOverlay}></div>
								<div className={classes.HeroTextContainer}>
									<Container size={640}>
										<Text tt="uppercase" className={classes.HeroDescription}>
											Ljus & Ljuslyktor
										</Text>
									</Container>
									<Link href={'/product/65b0d808da352956225983e8'}>
										<Text className={classes.HeroCardTitle}>
											Frost Ljuslykta M
										</Text>
									</Link>
								</div>
							</Card>
						</div>
					</SimpleGrid>
				</Center>
			</Container>
			{/* Newsletter section */}
			<div className={classes.NewsletterWrapper}>
				<Overlay color="#000" opacity={0.95} zIndex={1} />
				<div className={classes.inner}>
					<div className={classes.NewsletterTextContainer}>
						<Text
							pb={10}
							tt="uppercase"
							className={classes.NewsletterDescription}>
							Prenumerera på vårt nyhetsbrev
						</Text>
						<Title className={classes.NewsletterText}>
							Få mängder av inspiration, nyheter och mycket mer i din inkorg!
						</Title>
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							handleSubmit()
						}}
						className={classes.NewletterInputContainer}>
						<Input.Wrapper error={error}>
							<Input
								size="md"
								radius="xs"
								placeholder="Fyll i din emailadress"
								classNames={{ input: classes.input }}
								value={email}
								onChange={handleEmailChange}
							/>
						</Input.Wrapper>
						<Button
							className={classes.NewletterButton}
							variant="outline"
							radius="xs"
							size="md"
							color="white"
							type="submit">
							Prenumerera
						</Button>
					</form>
					<Modal.Root opened={opened} onClose={close}>
						<Modal.Overlay />
						<Modal.Content>
							<Modal.Header>
								<Modal.Title>
									Tack för att du prenumerera på vårt nyhetsbrev!
								</Modal.Title>
								<Modal.CloseButton />
							</Modal.Header>
						</Modal.Content>
					</Modal.Root>
				</div>
			</div>
		</>
	)
}

export default Home
