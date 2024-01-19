import mongoose, { Document } from 'mongoose'

interface User {
	name: string
	email: string
	hashedPassword: string
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
})

const User =
	mongoose.models.User || mongoose.model<UserModel>('User', userSchema)
export default User
export type { UserModel }
