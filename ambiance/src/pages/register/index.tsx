// pages/register/index.ts
// Sida för registererings-formulär
import React, { useState } from 'react'
import RegisterForm, {
	RegistrationFormInput,
} from '../../components/Auth/RegisterForm'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Container } from '@mantine/core'

const RegisterPage: React.FC = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const handleRegisterSubmit = async (data: RegistrationFormInput) => {
		try {
			// Validering av formulärdata
			if (!data.name || !data.email || !data.password) {
				console.error('Alla fält måste fyllas i.')
				return
			}

			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (response.ok) {
				// Registreringen lyckades
				const responseData = await response.json()
				console.log('Registration successful:', responseData)

				// Loggar in användaren efter registreringen
				const signInResponse = await signIn('credentials', {
					redirect: false,
					email: data.email, // Använd registrerade e-postadressen
					password: data.password, // Använd registrerat lösenord
				})

				if (signInResponse?.error) {
					console.error(
						'Inloggning efter registrering misslyckades:',
						signInResponse.error,
					)
				} else {
					// Inloggning efter registrering lyckad
					// Skickar användaren till profilsidan
					router.push('/mina-sidor/profil')
				}
			} else {
				const errorData = await response.json()
				console.error('Registration failed:', errorData)
			}
		} catch (error) {
			console.error('An error occurred during registration:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Container size="lg" pt={90}>
			<RegisterForm
				onSubmit={handleRegisterSubmit}
				isLoading={isLoading}
				onOpenLoginDrawer={() => {}}
			/>
		</Container>
	)
}

export default RegisterPage
