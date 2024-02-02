// Layout.tsx
import { ReactNode } from 'react'
import Header from '../components/Header/Header'
import Footer from './Footer/Footer'
import { AppShell, ScrollArea } from '@mantine/core'

interface LayoutProps {
	children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<AppShell>
			<AppShell.Header>
				<Header />
			</AppShell.Header>
			<AppShell.Section grow component={ScrollArea}>
				{children}
			</AppShell.Section>
			<Footer />
		</AppShell>
	)
}

export default Layout
