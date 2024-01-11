import mongoose, { Document } from 'mongoose';

interface Product {
  name: string;
  description: string;
  imageUrls: string[];
  price: number;
  brand: string;
  color: string;
  inStock: string;
  categories: {
    main: string;
    sub: string;
  };
}

interface ProductModel extends Product, Document {}

const productSchema = new mongoose.Schema<Product & Document>(
  {
    name: {
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
    categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
          required: true,
        },
      ],
  },
);

const Product = mongoose.models.Product || mongoose.model<ProductModel>('Product', productSchema);

export default Product;
