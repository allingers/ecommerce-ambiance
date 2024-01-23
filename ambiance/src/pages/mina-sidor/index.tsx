// pages/mina-sidor/index.tsx
import { Container, Tabs } from '@mantine/core'
import classes from '../../components/UserPage/UserPage.module.css'
import { FiUser } from 'react-icons/fi'
import { GoHeart } from 'react-icons/go'
import { LuPackageCheck } from 'react-icons/lu'
import UserProfile from '../../components/UserPage/UserProfile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import FavList from '@/components/FavList/FavList'
import { useEffect, useState } from 'react'

export default function UserPage() {
	const { data: session } = useSession()
	const router = useRouter()
	const [currentTab, setCurrentTab] = useState<string | null>(null)

	useEffect(() => {
		// Hämta aktuell tab från URL:en och uppdatera currentTab
		const tabFromUrl = router.query.tab
		setCurrentTab(tabFromUrl as string | null)
	}, [router.query.tab])

	const handleTabChange = (value: string | null) => {
		// Uppdatera URL:en med den valda fliken
		if (value) {
			router.push(`/mina-sidor?tab=${value}`, undefined, { shallow: true })
		}
	}
	return (
		<Container mt={100} size={'lg'}>
			<Tabs
				color="#9D6AA3"
				defaultValue="profil"
				orientation="vertical"
				value={router.query.activeTab as string}
				onChange={handleTabChange}>
				<Tabs.List>
					<Tabs.Tab
						className={`${classes.UserTab} ${classes.TabIcon}`}
						value="profil">
						<FiUser />
					</Tabs.Tab>
					<Tabs.Tab
						className={`${classes.FavTab} ${classes.TabIcon}`}
						value="favoriter">
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
				<Tabs.Panel value="favoriter">
					<FavList />
				</Tabs.Panel>
				<Tabs.Panel value="orderhistorik">Settings tab content</Tabs.Panel>
			</Tabs>
		</Container>
	)
}
