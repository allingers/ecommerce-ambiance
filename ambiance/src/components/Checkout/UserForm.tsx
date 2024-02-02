// UserDetailsForm.tsx
import React from 'react'
import { Container, SimpleGrid, TextInput } from '@mantine/core'
import classes from './Checkout.module.css'
import { UserData } from './CheckoutStepper'

interface UserDetailsFormProps {
	userData: UserData
	setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

const UserForm: React.FC<UserDetailsFormProps> = ({
	userData,
	setUserData,
}) => {
	return (
		<Container size="lg" pt={20}>
			<SimpleGrid
				cols={{ base: 1, sm: 1, md: 1, lg: 2 }}
				spacing={{ base: 10, sm: 'xl' }}
				verticalSpacing={{ base: 'xl', sm: 'xl' }}>
				<div className={classes.UserInfoCol}>
					<TextInput
						label="Förnamn"
						placeholder="Ange fullständigt namn"
						required={true}
						value={userData.name}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								name: event.target.value,
							}))
						}
					/>

					<TextInput
						label="E-post"
						placeholder="Ange e-postadress"
						required={true}
						value={userData.email}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								email: event.target.value,
							}))
						}
					/>

					<TextInput
						label="Telefonnummer"
						placeholder="Ange telefonnummer"
						required={true}
						value={userData.phoneNumber}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								phoneNumber: event.target.value,
							}))
						}
					/>
				</div>
				<div className={classes.AdressInfoCol}>
					<TextInput
						label="Adress"
						placeholder="Ange adress"
						required={true}
						value={userData.address.address}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								address: { ...prevData.address, address: event.target.value },
							}))
						}
					/>

					<TextInput
						label="Ort"
						placeholder="Ange Ort"
						required={true}
						value={userData.address.city}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								address: { ...prevData.address, city: event.target.value },
							}))
						}
					/>

					<TextInput
						label="Postnummer"
						placeholder="Ange postnummer"
						required={true}
						value={userData.address.postalCode}
						onChange={(event) =>
							setUserData((prevData) => ({
								...prevData,
								address: {
									...prevData.address,
									postalCode: event.target.value,
								},
							}))
						}
					/>
				</div>
			</SimpleGrid>
		</Container>
	)
}

export default UserForm
