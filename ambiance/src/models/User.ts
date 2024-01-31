import mongoose, { Document } from 'mongoose'
import { ProductModel } from './Product'

interface Address {
	address: string
	co?: string
	city: string
	postalCode: string
}

interface User {
	name: string
	email: string
	phoneNumber?: String
	hashedPassword: string
	favorites?: mongoose.Types.ObjectId[] | ProductModel[]
	avatar?: string
	address?: Address
}

interface UserModel extends User, Document {}

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phoneNumber: {
		type: String,
	},
	hashedPassword: {
		type: String,
		required: true,
		minlength: 5,
	},
	avatar: {
		type: String,
	},
	favorites: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
	address: {
		type: {
			address: String,
			city: String,
			postalCode: String,
		},
		default: null, // Sätt default till null eller ett annat värde om det är passande
	},
})

const User =
	mongoose.models.User || mongoose.model<UserModel>('User', userSchema)
export default User
export type { UserModel, Address }
