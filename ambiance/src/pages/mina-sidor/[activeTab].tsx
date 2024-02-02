// pages/mina-sidor/[activeTab].tsx
import UserProfile from '@/components/UserPage/UserProfile'
import { Container, Tabs, rem } from '@mantine/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FiUser } from 'react-icons/fi'
import { GoHeart } from 'react-icons/go'
import { LuPackageCheck } from 'react-icons/lu'
import FavList from '@/components/FavList/FavList'
import { useEffect, useState } from 'react'
import OrderHistory from '@/components/OrderHistory/OrderHistory'

const iconStyle = { width: rem(12), height: rem(12) }

interface MyAccountPageProps {
	activeTab: string
}

const MyAccountPage: React.FC<MyAccountPageProps> = ({
	activeTab: initialActiveTab,
}) => {
	const router = useRouter()
	const { data: session } = useSession()
	const [orders, setOrders] = useState([])

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				if (session) {
					const response = await fetch(
						`/api/orders/get-orders?userEmail=${session.user.email}`,
					)
					const data = await response.json()
					setOrders(data.orders)
				}
			} catch (error) {
				console.error('Fel vid hämtning av orderhistorik:', error)
			}
		}

		fetchOrders()
	}, [session])

	const [activeTab, setActiveTab] = useState<string>(
		initialActiveTab || 'profil',
	)

	const handleTabChange = (value: string | null) => {
		// Kontrollerar om användaren har en session innan ev. ändring av flik
		if ((value === 'profil' || value === 'orderhistorik') && !session) {
			// Användaren har ingen session, lås fliken
			return
		}

		// Tillåter ändring av flik
		setActiveTab(value || 'profil')
		router.push(`/mina-sidor/${value || 'profil'}`)
	}

	useEffect(() => {
		// Uppdaterar activeTab när asPath ändras
		const pathSegments = router.asPath.split('/')
		const tabFromPath = pathSegments[pathSegments.length - 1]
		setActiveTab(tabFromPath || 'profil')
	}, [router.asPath])

	return (
		<Container mt={100} size={'lg'}>
			<Tabs color="#9D6AA3" value={activeTab} onChange={handleTabChange}>
				<Tabs.List>
					<Tabs.Tab value="profil" leftSection={<FiUser style={iconStyle} />}>
						Profil
					</Tabs.Tab>
					<Tabs.Tab
						value="favoritlista"
						leftSection={<GoHeart style={iconStyle} />}>
						Favoritlista
					</Tabs.Tab>
					<Tabs.Tab
						value="orderhistorik"
						leftSection={<LuPackageCheck style={iconStyle} />}>
						Orderhistorik
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="profil">
					{session ? (
						<UserProfile
							user={
								session.user as {
									_id: string
									name: string
									email: string
									hashedPassword: string
									favorites?: string[]
								}
							}
						/>
					) : (
						'Logga in för att se profilen.'
					)}
				</Tabs.Panel>

				<Tabs.Panel value="favoritlista">
					<FavList />
				</Tabs.Panel>

				<Tabs.Panel value="orderhistorik">
					{session ? (
						<OrderHistory orders={orders} />
					) : (
						'Logga in för att se orderhistoriken.'
					)}
				</Tabs.Panel>
			</Tabs>
		</Container>
	)
}

export default MyAccountPage
