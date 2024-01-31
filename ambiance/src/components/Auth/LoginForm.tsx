import { getProviders, getSession, signIn, useSession } from 'next-auth/react'
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

	const handleInputChange = (field: string, value: string) => {
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}))
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
				const user = await userResponse.json()

				// Spara användarinformation i localStorage
				localStorage.setItem('user', JSON.stringify(user))

				onCloseDrawer() // Stäng drawern eller navigera någon annanstans
			} else {
				// Inloggningen misslyckades eller result är undefined
				console.error('Inloggning misslyckades:', result?.error)
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
						value={formData.email}
						onChange={(e) => handleInputChange('email', e.target.value)}
					/>
					<PasswordInput
						label="Lösenord"
						placeholder="Lösenord"
						required
						value={formData.password}
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
