// UserForm.tsx
// Steg 2 i Stepper-komponenten - Formulär för användarens uppgifter
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Container, SimpleGrid, TextInput } from '@mantine/core'
import classes from './Checkout.module.css'
import { UserData } from './CheckoutStepper'

interface UserFormProps {
	userData: UserData
	setUserData: React.Dispatch<React.SetStateAction<UserData>>
	validateFields: () => Record<string, string | null>
}

// Valideringsfunktioner för att kontrollera om inputfälten är tommma
const validateName = (name: string): string | null => {
	if (!name.trim()) {
		return 'Namn är obligatoriskt'
	}
	return null
}

const validateEmail = (email: string): string | null => {
	if (!email.trim()) {
		return 'E-post är obligatoriskt'
	}

	return null
}

const validatePhoneNumber = (phoneNumber: string): string | null => {
	if (!phoneNumber.trim()) {
		return 'Telefonnummer är obligatoriskt'
	}

	return null
}

const validateAddress = (address: string): string | null => {
	if (!address.trim()) {
		return 'Adress är obligatoriskt'
	}
	return null
}

const validateCity = (city: string): string | null => {
	if (!city.trim()) {
		return 'Stad är obligatoriskt'
	}
	return null
}

const validatePostalCode = (postalCode: string): string | null => {
	if (!postalCode.trim()) {
		return 'Postnummer är obligatoriskt'
	}
	return null
}

const UserForm = forwardRef<unknown, UserFormProps>(
	({ validateFields, userData, setUserData }, ref) => {
		const [nameError, setNameError] = useState<string | null>(null)
		const [emailError, setEmailError] = useState<string | null>(null)
		const [phoneNumberError, setPhoneNumberError] = useState<string | null>(
			null,
		)
		const [addressError, setAddressError] = useState<string | null>(null)
		const [cityError, setCityError] = useState<string | null>(null)
		const [postalCodeError, setPostalCodeError] = useState<string | null>(null)

		// onBlurHandler hantera händelserna när användaren tar bort fokus från ett textinput-fält.
		// Beroende på vilket fält som förlorar fokus, valideras motsvarande användardata och uppdaterar felmeddelandet.
		const onBlurHandler = (fieldName: string) => {
			const errors = validateFields()
			switch (fieldName) {
				case 'name':
					setNameError(validateName(userData.name))
					break
				case 'email':
					setEmailError(validateEmail(userData.email))
					break
				case 'phoneNumber':
					setPhoneNumberError(validatePhoneNumber(userData.phoneNumber))
					break
				case 'address':
					setAddressError(validateAddress(userData.address.address))
					break
				case 'city':
					setCityError(validateCity(userData.address.city))
					break
				case 'postalCode':
					setPostalCodeError(validatePostalCode(userData.address.postalCode))
					break
				default:
					break
			}
		}
		// useImperativeHandle exponerar en funktion för förälderkomponenten checkoutStepper
		useImperativeHandle(
			ref,
			() => ({
				validateFields: () => {
					// Validera varje fält och få eventuella felmeddelanden
					const nameError = validateName(userData.name)
					const emailError = validateEmail(userData.email)
					const phoneNumberError = validatePhoneNumber(userData.phoneNumber)
					const addressError = validateAddress(userData.address.address)
					const cityError = validateCity(userData.address.city)
					const postalCodeError = validatePostalCode(
						userData.address.postalCode,
					)

					// Uppdaterar felmeddelanden i state
					setNameError(nameError)
					setEmailError(emailError)
					setPhoneNumberError(phoneNumberError)
					setAddressError(addressError)
					setCityError(cityError)
					setPostalCodeError(postalCodeError)

					// Kontrollerar om något fält är ogiltigt
					const isFormValid =
						!nameError &&
						!emailError &&
						!phoneNumberError &&
						!addressError &&
						!cityError &&
						!postalCodeError

					// Visar felmeddelanden om formuläret inte är giltigt
					if (!isFormValid) {
						console.log('Vänligen fyll i alla obligatoriska fält.')
					}

					return isFormValid
				},
			}),
			[userData], // Uppdatera endast funktionen när userData ändras
		)
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
							onBlur={() => onBlurHandler('name')}
							error={nameError}
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
							onBlur={() => onBlurHandler('email')}
							error={emailError}
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
							onBlur={() => onBlurHandler('phoneNumber')}
							error={phoneNumberError}
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
							onBlur={() => onBlurHandler('address')}
							error={addressError}
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
							onBlur={() => onBlurHandler('city')}
							error={cityError}
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
							onBlur={() => onBlurHandler('postalCode')}
							error={postalCodeError}
						/>
					</div>
				</SimpleGrid>
			</Container>
		)
	},
)

export default UserForm
