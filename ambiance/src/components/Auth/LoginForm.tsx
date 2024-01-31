import { getProviders, signIn, useSession } from 'next-auth/react'
import {
	Drawer,
	Container,
	Group,
	Text,
	Divider,
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Button,
	useMantineTheme,
	Paper,
} from '@mantine/core'
import classes from './LoginForm.module.css'
import { GoogleButton } from '../Auth/GoogleButton'
import router from 'next/router'
import { useState } from 'react'

interface LoginFormProps {
	onCloseDrawer: () => void //Callback för att stänga drawern
}

const LoginForm: React.FC<LoginFormProps> = ({ onCloseDrawer }) => {
	const theme = useMantineTheme()
	const { data: session } = useSession()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [errorMessage, setErrorMessage] = useState('')
	const [errorPwMessage, setErrorPwMessage] = useState('')

	const handleInputChange = (field: string, value: string) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}))
		setErrorMessage('')
		setErrorPwMessage('')
	}

	const handleLogin = async () => {
		const { email, password } = formData

		try {
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
				callbackUrl: `${window.location.origin}`,
			})

			if (result && result.ok) {
				// Inloggningen lyckades
				const userResponse = await fetch('/api/user/get-user')
				const userInfo = await userResponse.json()

				// Spara användarinformation i localStorage
				localStorage.setItem('userInfo', JSON.stringify(userInfo))

				onCloseDrawer() // Stäng drawern
			} else {
				// Inloggningen misslyckades eller result är undefined
				console.error('Inloggning misslyckades:', result?.error)

				// Avgör typen av fel och sätt lämpligt felmeddelande
				if (result?.error === 'Email is not registered') {
					setErrorMessage('Ingen användare hittades med denna e-postadress.')
				} else {
					setErrorPwMessage(
						'Lösenordet matchar inte den angivna e-postadressen',
					)
				}
			}
		} catch (error) {
			console.error('Ett fel uppstod vid inloggning:', error)
		}
	}
	const handleRegisterClick = () => {
		// Navigera till registreringssidan när "Registrera dig här" klickas
		router.push('/register')
		onCloseDrawer()
	}

	return (
		<Drawer
			opened={!session}
			onClose={onCloseDrawer}
			position="right"
			size="md">
			<Container size={420} my={10}>
				<Text className={classes.loginTitle}>Logga in med:</Text>
				<Group grow mb="md" mt="md">
					<GoogleButton radius="xl">Google</GoogleButton>
				</Group>
				<Divider my="xs" label="eller fortsätt med:" labelPosition="center" />

				<Paper>
					<TextInput
						type="email"
						label="E-post"
						placeholder="exempel@gmail.com"
						required
						error={errorMessage}
						value={formData.email}
						onChange={(e) => handleInputChange('email', e.target.value)}
					/>
					<PasswordInput
						label="Lösenord"
						placeholder="Lösenord"
						required
						value={formData.password}
						error={errorPwMessage}
						onChange={(e) => handleInputChange('password', e.target.value)}
					/>
					<Group justify="space-between" mt="lg">
						<Checkbox label="Kom ihåg mig" />
						<Anchor component="button" size="sm">
							Glömt lösenord?
						</Anchor>
					</Group>

					<Button
						className={classes.formButton}
						variant="filled"
						color="rgba(43, 43, 43, 1)"
						type="submit"
						fullWidth
						mt="xl"
						onClick={handleLogin}>
						Logga in
					</Button>
				</Paper>
			</Container>

			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Har du inget konto?{' '}
				<Anchor size="sm" component="button" onClick={handleRegisterClick}>
					registrera dig här
				</Anchor>
			</Text>
		</Drawer>
	)
}

export default LoginForm

export async function getServerSideProps() {
	return {
		props: {
			providers: await getProviders(),
		},
	}
}
