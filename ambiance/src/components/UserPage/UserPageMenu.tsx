import { Container, Tabs } from '@mantine/core'
import classes from './UserPageMenu.module.css'
import { FiUser } from 'react-icons/fi'
import { GoHeart } from 'react-icons/go'
import { LuPackageCheck } from 'react-icons/lu'
import UserButton from './UserButton'
import UserProfile from './UserProfile'
import { useSession } from 'next-auth/react'

export default function UserPageMenu() {
	const { data: session } = useSession()

	return (
		<Container mt={50} size={'lg'}>
			<Tabs defaultValue="profil" orientation="vertical">
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
				<Tabs.Panel value="favoritlista">Messages tab content</Tabs.Panel>
				<Tabs.Panel value="orderhistorik">Settings tab content</Tabs.Panel>
			</Tabs>
		</Container>
	)
}
