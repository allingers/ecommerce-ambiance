import mongoose, { Document } from 'mongoose'
import { ProductModel } from './Product'

interface User {
	name: string
	email: string
	hashedPassword: string
	favorites?: mongoose.Types.ObjectId[] | ProductModel[]
	avatar?: string
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
			ref: 'Product', // Matchar namnet på produktmodellen
		},
	],
})

const User =
	mongoose.models.User || mongoose.model<UserModel>('User', userSchema)
export default User
export type { UserModel }
