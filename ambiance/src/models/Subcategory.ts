// models/Subcategory.ts
import mongoose, { Document, Schema, SchemaTypeOptions } from 'mongoose';

interface Subcategory {
  name: string;
  parentCategory: string;
}

interface SubcategoryModel extends Subcategory, Document {
  _id: string; // Ändra från mongoose.Types.ObjectId till string
}

const subcategorySchemaDefinition: Record<keyof Subcategory, SchemaTypeOptions<any>> = {
  name: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: String, // Ändra från mongoose.Schema.Types.ObjectId till String
    ref: 'Category',
    required: true,
  },
};

const subcategorySchema = new mongoose.Schema<SubcategoryModel>(
  subcategorySchemaDefinition,
);

const Subcategory = mongoose.model<SubcategoryModel>('Subcategory', subcategorySchema);

export default Subcategory;
