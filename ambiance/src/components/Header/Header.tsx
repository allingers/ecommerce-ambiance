// Header.tsx
import {
	Menu,
	Group,
	Center,
	Burger,
	Container,
	Text,
	rem,
	UnstyledButton,
	useMantineTheme,
	Badge,
	Divider,
	Drawer,
	Collapse,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
	IconChevronDown,
	IconHeart,
	IconLogout,
	IconUser,
} from '@tabler/icons-react'
import classes from './Header.module.css'
import { useState } from 'react'
import LoginForm from '../Auth/LoginForm'
import { signOut, useSession } from 'next-auth/react'
import CartDrawer from '../CartDrawer/CartDrawer'
import { BsHandbag } from 'react-icons/bs'
import { FiUser, FiUserCheck } from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { GoHeart } from 'react-icons/go'
import Link from 'next/link'
import router from 'next/router'
import { links } from './MenuLinks'

// const links = [
// 	{
// 		link: '/products/dekoration',
// 		label: 'Dekoration',
// 		links: [
// 			{ link: '/products/dekoration/posters', label: 'Posters' },
// 			{ link: '/products/dekoration/skulpturer', label: 'Skulpturer' },
// 			{ link: '/products/dekoration/vaser', label: 'Vaser' },
// 			{ link: '/products/dekoration/krukor', label: 'Krukor' },
// 			{
// 				link: '/products/dekoration/dekorativa-accessoarer',
// 				label: 'Dekorativa Accessoarer',
// 			},
// 		],
// 	},
// 	{
// 		link: '/products/ljus-&-ljuslyktor',
// 		label: 'Ljus & Ljuslyktor',
// 		links: [
// 			{
// 				link: '/products/ljus-&-ljuslyktor/ljusstakar',
// 				label: 'Ljusstakar',
// 			},
// 			{ link: '/products/ljus-&-ljuslyktor/ljuslyktor', label: 'Ljuslyktor' },
// 			{ link: '/products/ljus-&-ljuslyktor/ljus', label: 'Ljus' },
// 			{ link: '/products/ljus-&-ljuslyktor/doftljus', label: 'Doftljus' },
// 		],
// 	},
// 	{
// 		link: '/products/belysning',
// 		label: 'Belysning',
// 		links: [
// 			{ link: '/products/belysning/taklampor', label: 'Taklampor' },
// 			{ link: '/products/belysning/bordslampor', label: 'Bordslampor' },
// 			{ link: '/products/belysning/vägglampor', label: 'Vägglampor' },
// 			{ link: '/products/belysning/golvlampor', label: 'Golvlampor' },
// 		],
// 	},
// 	{
// 		link: '/products/textil',
// 		label: 'Textil',
// 		links: [
// 			{
// 				link: '/products/textil/plädar-&-prydnadskuddar',
// 				label: 'Plädar & Prydnaskuddar',
// 			},
// 			{ link: '/products/textil/mattor', label: 'Mattor' },
// 			{ link: '/products/textil/gardiner', label: 'Gardiner' },
// 			{ link: '/products/textil/kökstextil', label: 'Kökstextil' },
// 		],
// 	},
// ]
export default function Header() {
	const theme = useMantineTheme()
	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const [drawerOpened, setDrawerOpened] = useState(false)
	const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
	const { getCartItemCount } = useCart()
	const { data: session } = useSession()

	const [menudrawerOpened, { toggle: toggleDrawer, close: closemenuDrawer }] =
		useDisclosure(false)
	const [linksOpened, setLinksOpened] = useState<boolean[]>([])

	const handleLoginClick = () => {
		setDrawerOpened(true)
	}

	const handleLogout = async () => {
		localStorage.removeItem('userInfo') //Rensar användarens information från localStorage
		await signOut() // Anropa signOut för att logga ut användaren
		setUserMenuOpened(false) // Stänger användarmenyn efter utloggning
		router.push('/')
	}

	const handleCartIconClick = () => {
		setIsCartDrawerOpen(!isCartDrawerOpen)
	}

	const handleNavigateToProfile = () => {
		router.push('/mina-sidor/profil')
	}

	const handleNavigateToFav = () => {
		router.push('/mina-sidor/favoritlista')
	}

	const items = links.map((link) => {
		const menuItems = link.links?.map((item) => (
			<Menu.Item key={item.link}>
				<Link href={item.link}>{item.label}</Link>
			</Menu.Item>
		))

		if (menuItems) {
			return (
				<Menu
					position="bottom-start"
					key={link.label}
					trigger="hover"
					transitionProps={{ exitDuration: 0 }}
					withinPortal>
					<Menu.Target>
						<Link href={link.link} className={classes.link}>
							<Center>
								<span className={classes.linkLabel}>{link.label}</span>
								<IconChevronDown size="0.9rem" stroke={1.5} />
							</Center>
						</Link>
					</Menu.Target>
					<Menu.Dropdown w={500}>{menuItems}</Menu.Dropdown>
				</Menu>
			)
		}

		return (
			<Link key={link.label} href={link.link} className={classes.link}>
				{link.label}
			</Link>
		)
	})

	const handleToggleLink = (index: number) => {
		setLinksOpened((prevLinksOpened) => {
			const updatedLinksOpened = [...prevLinksOpened]
			updatedLinksOpened[index] = !updatedLinksOpened[index]
			return updatedLinksOpened
		})
	}

	const drawerMenuContent = links.map((link, index) => {
		const menuItems = link.links?.map((item) => (
			<div key={item.link}>
				<Link
					onClick={() => {
						closemenuDrawer()
						router.push(item.link)
					}}
					href={item.link}
					className={classes.drawerSubLink}>
					{item.label}
				</Link>
			</div>
		))

		const handleNavigateToMainCategory = (link: string) => {
			router.push(link)
		}

		return (
			<Container
				size="xxl"
				className={classes.menuDrawerContainer}
				key={link.label}>
				<UnstyledButton
					className={classes.drawerLinkMainButton}
					onClick={() => handleToggleLink(index)}
					onDoubleClick={() => handleNavigateToMainCategory(link.link)}>
					<div className={classes.drawerCategorySpan}>
						<IconChevronDown size="0.9rem" stroke={1.5} />
						<span>{link.label}</span>
					</div>
				</UnstyledButton>

				<Collapse in={linksOpened[index]}>{menuItems}</Collapse>
			</Container>
		)
	})
	return (
		<>
			<header className={classes.header}>
				<Container className={classes.mainSection} size="md">
					<div className={classes.inner}>
						<Text className={classes.logo}>
							{' '}
							<Link href="/">Ambiance</Link>
						</Text>
						<Group gap={5} visibleFrom="sm" justify="space-between">
							{items}
						</Group>
						<Menu
							width={260}
							position="bottom-start"
							transitionProps={{ transition: 'pop-top-right' }}
							onClose={() => setUserMenuOpened(false)}
							onOpen={() => setUserMenuOpened(true)}
							withinPortal>
							<Group className={classes.rightSection}>
								{session ? (
									// Om session finns, visa "checkad användar-ikon" (användarmeny tillgänglig)
									<Menu.Target>
										<UnstyledButton
											className={[
												classes.user,
												userMenuOpened && classes.userActive,
											]
												.filter(Boolean)
												.join(' ')}>
											<span className={classes.UserIconSpan}>
												<FiUserCheck />
											</span>
										</UnstyledButton>
									</Menu.Target>
								) : (
									// Om ingen session finns, "användarikon" (Drawer för inloggningformulär tillgänglig)
									<UnstyledButton
										onClick={handleLoginClick}
										className={classes.LoginButton}>
										<span className={classes.LoginIconSpan}>
											<FiUser />
										</span>
									</UnstyledButton>
								)}
								<div className={classes.CartButtonContainer}>
									<UnstyledButton
										onClick={handleCartIconClick}
										className={classes.CartButton}>
										{getCartItemCount() > 0 && (
											<Badge className={classes.badge} circle>
												{getCartItemCount()}
											</Badge>
										)}
										<span className={classes.CartIconSpan}>
											<BsHandbag />
										</span>
									</UnstyledButton>
								</div>
								<UnstyledButton className={classes.HeartButton}>
									<span className={classes.HeartIconSpan}>
										<GoHeart onClick={handleNavigateToFav} />
									</span>
								</UnstyledButton>
							</Group>
							{session && (
								<Menu.Dropdown>
									<>
										<Menu.Item
											onClick={handleNavigateToProfile}
											leftSection={
												<IconUser
													style={{
														width: rem(16),
														height: rem(16),
													}}
													color={theme.colors.blue[6]}
													stroke={1.5}
												/>
											}>
											Mina sidor
										</Menu.Item>
										<Menu.Item
											onClick={handleNavigateToFav}
											leftSection={
												<IconHeart
													style={{
														width: rem(16),
														height: rem(16),
													}}
													color={theme.colors.red[6]}
													stroke={1.5}
												/>
											}>
											Favoriter
										</Menu.Item>
										<Menu.Label>
											<Divider />
										</Menu.Label>
										<Menu.Item
											leftSection={
												<IconLogout
													style={{
														width: rem(16),
														height: rem(16),
													}}
													stroke={1.5}
												/>
											}>
											<span onClick={handleLogout}> Logga ut </span>
										</Menu.Item>
									</>
								</Menu.Dropdown>
							)}
						</Menu>
						{/* CartDrawer */}
						<CartDrawer
							isOpen={isCartDrawerOpen}
							onClose={() => setIsCartDrawerOpen(false)}
							products={[]}
						/>
						<Burger
							opened={menudrawerOpened}
							onClick={toggleDrawer}
							hiddenFrom="sm"
						/>
						{/* LoginDrawer */}
					</div>
					{drawerOpened && (
						<LoginForm onCloseDrawer={() => setDrawerOpened(false)} />
					)}
				</Container>
			</header>
			<Drawer
				opened={menudrawerOpened}
				onClose={closemenuDrawer}
				size="100%"
				padding="md"
				hiddenFrom="sm"
				zIndex={1000000}>
				{drawerMenuContent}
			</Drawer>
		</>
	)
}
