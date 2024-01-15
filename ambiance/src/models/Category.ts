// models/Category.ts
import mongoose, { Document } from 'mongoose';

interface Category {
  name: string;
}

interface CategoryModel extends Category, Document {
  _id: string; // Ändra från mongoose.Types.ObjectId till string
}

const categorySchema = new mongoose.Schema<CategoryModel>(
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


