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
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
	IconChevronDown,
	IconHeart,
	IconLogout,
	IconSettings,
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
import { GoHeart, GoHeartFill } from 'react-icons/go'
import Link from 'next/link'

const links = [
	{
		link: '/dekoration',
		label: 'Dekoration',
		links: [
			{ link: '/dekoration/posters', label: 'Posters' },
			{ link: '/dekoration/tavlor', label: 'Tavlor' },
			{ link: '/dekoration/skulpturer', label: 'Skulpturer' },
			{ link: '/dekoration/vaser', label: 'Vaser' },
			{ link: '/dekoration/krukor', label: 'Krukor' },
			{
				link: '/dekoration/dekorativaaccessoarer',
				label: 'Dekorativa Accessoarer',
			},
		],
	},
	{
		link: '/ljus&ljuslyktor',
		label: 'Ljus & Ljuslyktor',
		links: [
			{
				link: '/ljus&ljuslyktor/ljusstakar',
				label: 'Ljusstakar',
			},
			{ link: '/ljus&ljuslyktor/ljuslyktor', label: 'Ljuslyktor' },
			{ link: '/ljus&ljuslyktor/ljus', label: 'Ljus' },
			{ link: '/ljus&ljuslyktor/doftljus', label: 'Doftljus' },
		],
	},
	{
		link: '/belysning',
		label: 'Belysning',
		links: [
			{ link: '/belysning/taklampor', label: 'Taklampor' },
			{ link: '/belysning/bordslampor', label: 'Bordslampor' },
			{ link: '/belysning/vagglampor', label: 'Vägglampor' },
			{ link: '/belysning/golvlampor', label: 'Golvlampor' },
			{
				link: '/belysning/dekorativbelysning',
				label: 'Dekorativ Belysning',
			},
		],
	},
	{
		link: '/textil',
		label: 'Textil',
		links: [
			{
				link: '/textil/pladar&prydnadskuddar',
				label: 'Plädar & Prydnaskuddar',
			},
			{ link: '/textil/mattor', label: 'Mattor' },
			{ link: '/textil/gardiner', label: 'Gardiner' },
			{ link: '/textil/kökstextil', label: 'Kökstextil' },
		],
	},
]
export default function Header() {
	const theme = useMantineTheme()
	const [opened, { toggle }] = useDisclosure(false)
	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const [drawerOpened, setDrawerOpened] = useState(false)
	const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
	const { getCartItemCount } = useCart()
	const { data: session } = useSession()

	const handleLoginClick = () => {
		setDrawerOpened(true)
	}

	const handleLogout = async () => {
		await signOut() // Anropa signOut för att logga ut användaren
		setUserMenuOpened(false) // Stäng användarmenyn efter utloggning
	}

	const handleCartIconClick = () => {
		setIsCartDrawerOpen(!isCartDrawerOpen)
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

	return (
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
								// Om session finns, visa användarens namn och dropdown-menyn
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
								// Om ingen session finns, visa "Logga in"-knappen
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
									<GoHeart />
								</span>
								{/* <span className={classes.FilledHeartIconSpan}><GoHeartFill /></span> */}
							</UnstyledButton>
						</Group>
						{session && (
							<Menu.Dropdown>
								<>
									<Menu.Item
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
									<Menu.Label>Settings</Menu.Label>
									<Menu.Item
										leftSection={
											<IconSettings
												style={{
													width: rem(16),
													height: rem(16),
												}}
												stroke={1.5}
											/>
										}>
										Hantera kontoinställningar
									</Menu.Item>
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
					{/* Burger - meny för mindre skärmar */}
					<Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
					{/* LoginDrawer */}
					{drawerOpened && (
						<LoginForm onCloseDrawer={() => setDrawerOpened(false)} />
					)}
				</div>
			</Container>
		</header>
	)
}
