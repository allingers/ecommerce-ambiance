import mongoose, { Document } from 'mongoose';

export interface Product {
  quantity?: number; // Observera: quantity saknas i din första Product-modell
  name: string;
  slug: string;
  description: string;
  imageUrls: string[];
  price: number;
  brand: string;
  color: string;
  inStock: string;
  categories: {
    main: mongoose.Types.ObjectId; // Huvudkategori
    sub: mongoose.Types.ObjectId;  // Underkategori
  };
}

interface ProductModel extends Product, Document {}

const productSchema = new mongoose.Schema<Product & Document>(
  {
    name: {
      type: String,
      required: true,
    },
   slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    inStock: {
      type: String,
      required: true,
    },
    categories: {
      main: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
      sub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model<ProductModel>('Product', productSchema);

export { Product };
export type { ProductModel };

