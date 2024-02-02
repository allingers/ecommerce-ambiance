// api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import bcrypt from 'bcrypt'

interface ResponseData {
	error?: string
	msg?: string
}

const validateEmail = (email: string): boolean => {
	const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
	return regEx.test(email)
}

const validateForm = async (name: string, email: string, password: string) => {
	if (name.length < 3) {
		return { error: 'Username must have 3 or more characters' }
	}
	if (!validateEmail(email)) {
		return { error: 'Email is invalid' }
	}

	await dbConnect()
	const emailUser = await User.findOne({ email: email })

	if (emailUser) {
		return { error: 'Email already exists' }
	}

	if (password.length < 5) {
		return { error: 'Password must have 5 or more characters' }
	}

	return null
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	if (req.method !== 'POST') {
		return res
			.status(200)
			.json({ error: 'This API call only accepts POST methods' })
	}

	const { name, email, password } = req.body

	const errorMessage = await validateForm(name, email, password)
	if (errorMessage) {
		return res.status(400).json(errorMessage as ResponseData)
	}

	const hashedPassword = await bcrypt.hash(password, 12)

	const newUser = new User({
		name,
		email,
		hashedPassword,
	})

	newUser
		.save()
		.then(() =>
			res.status(200).json({ msg: 'Successfuly created new User: ' + newUser }),
		)
		.catch((err: string) =>
			res.status(400).json({ error: "Error on '/api/register': " + err }),
		)
}
