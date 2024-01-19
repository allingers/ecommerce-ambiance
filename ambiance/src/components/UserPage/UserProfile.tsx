// UserProfile.tsx
import { TextInput } from '@mantine/core'
import React, { useState, ChangeEvent, useEffect } from 'react'
import { UserModel } from '@/models/User'
import classes from './UserProfile.module.css'
import { useSession } from 'next-auth/react'

interface UserProfileProps {
	user: Partial<UserModel>
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
	const [newPassword, setNewPassword] = useState('')
	const [focused, setFocused] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		hashedPassword: '',
		// Lägg till andra användaruppgifter här
	})

	useEffect(() => {
		// Uppdatera userData när session uppdateras
		setUserData({
			name: user.name || '',
			email: user.email || '',
			hashedPassword: user.hashedPassword || '',
			// Lägg till andra användaruppgifter här
		})
	}, [user])

	const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNewPassword(event.currentTarget.value)
	}

	const handleInputChange = (name: string, value: string) => {
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleEditClick = () => {
		setEditMode(true)
	}

	const handleSaveChanges = () => {
		// Skicka förfrågan till backend för att uppdatera användaruppgifter
		// Använd userData för att hämta uppdaterad information
		// Exempel: api.updateUser(userData)

		// Uppdatera även lösenordet om ett nytt lösenord har angetts
		if (newPassword.trim().length > 0) {
			// Skicka förfrågan till backend för att uppdatera lösenordet
			// Exempel: api.updatePassword(newPassword)
		}

		// Stäng redigeringsläget efter att uppgifterna har sparats
		setEditMode(false)
	}

	return (
		<div>
			<TextInput
				type="name"
				required
				classNames={classes}
				value={userData.name}
				onChange={(event) =>
					handleInputChange('name', event.currentTarget.value)
				}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				mt="md"
				autoComplete="nope"
				disabled={!editMode}
			/>

			<TextInput
				type="email"
				required
				classNames={classes}
				value={userData.email}
				onChange={(event) =>
					handleInputChange('email', event.currentTarget.value)
				}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				mt="md"
				autoComplete="nope"
				disabled={!editMode}
			/>

			<TextInput
				label="Lösenord"
				type="password"
				required
				classNames={classes}
				value={userData.hashedPassword}
				onChange={(event) =>
					handleInputChange('hashedPassword', event.currentTarget.value)
				}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				mt="md"
				autoComplete="nope"
				disabled={!editMode}
			/>

			<TextInput
				label="Nytt lösenord"
				type="password"
				placeholder="Enter new password"
				required
				classNames={classes}
				value={newPassword}
				onChange={handleNewPasswordChange}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				mt="md"
				autoComplete="new-password"
				disabled={!editMode}
			/>

			{/* Lägg till andra inputfält för användaruppgifter här */}
			{editMode ? (
				<button onClick={handleSaveChanges}>Spara ändringar</button>
			) : (
				<button onClick={handleEditClick}>Redigera profil</button>
			)}
		</div>
	)
}

export default UserProfile
