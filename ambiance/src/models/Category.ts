// models/Category.ts
import mongoose, { Document } from 'mongoose';

interface Category {
  name: string;
}

interface CategoryModel extends Category, Document {}

const categorySchema = new mongoose.Schema<Category & Document>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
);

const Category = mongoose.model<CategoryModel>('Category', categorySchema);

export default Category;

