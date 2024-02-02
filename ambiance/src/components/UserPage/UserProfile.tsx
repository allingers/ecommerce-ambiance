// UserProfile.tsx
import { Button, Paper, TextInput, Image } from '@mantine/core'
import React, { useState, ChangeEvent, useEffect } from 'react'
import classes from './UserProfile.module.css'

interface UserProfileProps {
	user: {
		_id: string
		name: string
		email: string
		hashedPassword: string
		favorites?: string[]
	}
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [focused, setFocused] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [userData, setUserData] = useState({
		name: '',
		email: '',
	})

	useEffect(() => {
		setUserData((prevData) => ({
			...prevData,
			name: user.name || '',
			email: user.email || '',
		}))
	}, [user])

	const handleInputChange = (name: string, value: string) => {
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleEditClick = () => {
		setEditMode(true)
	}

	const handleSaveChanges = async () => {
		try {
			// Skicka förfrågan för att uppdatera användaruppgifter
			const updatedUserData = await fetch('/api/user/update-user-profile', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			})

			console.log(userData)

			if (!updatedUserData.ok) {
				console.error('Fel vid uppdatering av användaruppgifter')

				return
			}

			// Ladda upp den valda bilden om det finns en
			if (selectedImage) {
				const formData = new FormData()
				formData.append('image', selectedImage)

				const uploadedImage = await fetch('/api/uploadProfileImage', {
					method: 'POST',
					body: formData,
				})

				if (!uploadedImage.ok) {
					console.error('Fel vid uppladdning av profilbild')
					return
				}
			}

			// Stäng redigeringsläget efter att uppgifterna har sparats
			setEditMode(false)
		} catch (error) {
			console.error('Ett oväntat fel inträffade', error)
		}
	}

	const handleImageUpload = (file: File) => {
		setSelectedImage(file)
	}

	return (
		<div>
			<Paper
				pt={20}
				p="md"
				radius="md"
				className={classes.ProfileImageUploader}>
				<div style={{ marginBottom: '16px' }}>
					<Image
						src={
							selectedImage
								? URL.createObjectURL(selectedImage)
								: '/images/avatar-placeholder.png'
						}
						alt="Profile"
						height={150}
						width="auto"
						maw={150}
						style={{ objectFit: 'cover' }}
					/>
				</div>
				{editMode && (
					<input
						type="file"
						accept="image/*"
						onChange={(e) => handleImageUpload(e.target.files![0])}
					/>
				)}
			</Paper>

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
				ml="md"
				maw={300}
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
				ml="md"
				maw={300}
				autoComplete="nope"
				disabled={!editMode}
			/>

			{editMode ? (
				<Button className={classes.SaveButton} onClick={handleSaveChanges}>
					Spara ändringar
				</Button>
			) : (
				<Button className={classes.EditButton} onClick={handleEditClick}>
					Redigera profil
				</Button>
			)}
		</div>
	)
}

export default UserProfile
