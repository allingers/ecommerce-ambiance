// pages/mina-sidor/index.tsx
import { Container, Tabs } from '@mantine/core'
import classes from '../../components/UserPage/UserPage.module.css'
import { FiUser } from 'react-icons/fi'
import { GoHeart } from 'react-icons/go'
import { LuPackageCheck } from 'react-icons/lu'
import UserProfile from '../../components/UserPage/UserProfile'
import { useSession } from 'next-auth/react'
import FavList from '@/components/FavList/FavList'

export default function UserPage() {
	const { data: session } = useSession()

	return (
		<Container mt={100} size={'lg'}>
			<Tabs color="#9D6AA3" defaultValue="profil" orientation="vertical">
				<Tabs.List>
					<Tabs.Tab
						className={`${classes.UserTab} ${classes.TabIcon}`}
						value="profil">
						<FiUser />
					</Tabs.Tab>
					<Tabs.Tab
						className={`${classes.FavTab} ${classes.TabIcon}`}
						value="favoritlista">
						<GoHeart />
					</Tabs.Tab>
					<Tabs.Tab
						className={`${classes.OrdersTab} ${classes.TabIcon}`}
						value="orderhistorik">
						<LuPackageCheck />
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="profil">
					<UserProfile user={session?.user ?? {}} />
				</Tabs.Panel>
				<Tabs.Panel value="favoritlista">
					<FavList />
				</Tabs.Panel>
				<Tabs.Panel value="orderhistorik">Settings tab content</Tabs.Panel>
			</Tabs>
		</Container>
	)
}
