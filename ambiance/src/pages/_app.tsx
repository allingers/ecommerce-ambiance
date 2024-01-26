// _app.tsx
import React from 'react'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import '@mantine/core/styles.css'
import { MantineProvider, createTheme } from '@mantine/core'
import Layout from '@/components/Layout'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/contexts/CartContext'
import '@mantine/carousel/styles.css'
import { FilterProvider } from '@/contexts/FilterContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'

const theme = createTheme({})

function App({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider theme={theme}>
			<SessionProvider session={pageProps.session}>
				<CartProvider>
					<FavoritesProvider>
						<FilterProvider>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</FilterProvider>
					</FavoritesProvider>
				</CartProvider>
			</SessionProvider>
		</MantineProvider>
	)
}

export default App
