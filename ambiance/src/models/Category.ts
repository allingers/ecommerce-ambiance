// models/Category.ts
import mongoose, { Document } from 'mongoose'

interface Category {
	name: string
}

interface CategoryModel extends Category, Document {
	_id: string
}

const categorySchema = new mongoose.Schema<CategoryModel>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
})

// Kontrollera om modellen redan finns innan du skapar den
const Category =
	(mongoose.models.Category as mongoose.Model<CategoryModel>) ||
	mongoose.model<CategoryModel>('Category', categorySchema)

export default Category
export type { CategoryModel }
