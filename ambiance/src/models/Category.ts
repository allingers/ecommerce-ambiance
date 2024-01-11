// Kategorischema
import mongoose, { Document } from 'mongoose';

interface Category {
  name: string;
  parent?: mongoose.Types.ObjectId | null;
}

interface CategoryModel extends Category, Document {}

const categorySchema = new mongoose.Schema<Category & Document>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
  },
);

const CategoryModel = mongoose.models.Category || mongoose.model<CategoryModel>('Category', categorySchema);

export default CategoryModel;
