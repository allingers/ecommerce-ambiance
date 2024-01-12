// ProductCard.tsx
import React from 'react';
import { Card, Text, Image, Group } from '@mantine/core';
import classes from './ProductCard.module.css'
import { ObjectId } from 'mongoose';

  
export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  imageUrls: string[];
  price: number;
  brand: string;
  color: string;
  inStock: string;
  categories: {
    main: ObjectId; // Huvudkategori
    sub: ObjectId;  // Underkategori
  };
}


  interface ProductCardProps {
    product: IProduct;
  }

  
  const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    
    return (
        <>
       < Card className={classes.card}>
       <Card.Section className={classes.section}>
        {product.imageUrls && product.imageUrls.length > 0 && (
        <Image className={classes.cardImage} src={product.imageUrls[0]} alt={product.name} height={200} />
      )}
        </Card.Section>
        <Text className={classes.cardBrand} fw={500} size="sm" mt="md">{product.brand}</Text>
        <Text className={classes.cardName} fw={400} size="md" mt="md">{product.name}</Text>
        <Text className={classes.cardPrice} fw={500} size="md" mt="md">{product.price} SEK</Text>

        </Card>
      </>
    );
  };

export default ProductCard;
