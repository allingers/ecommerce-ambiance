// models/Subcategory.ts
import mongoose, { Document } from 'mongoose';

interface Subcategory {
  name: string;
  parentCategory: mongoose.Types.ObjectId;
}

interface SubcategoryModel extends Subcategory, Document {}

const subcategorySchema = new mongoose.Schema<Subcategory & Document>(
  {
    name: {
      type: String,
      required: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
);

const Subcategory = mongoose.model<SubcategoryModel>('Subcategory', subcategorySchema);

export default Subcategory;
