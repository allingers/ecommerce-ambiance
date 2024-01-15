// ProductCard.tsx
import React, { useState } from 'react';
import { Card, Text, Image, Group } from '@mantine/core';
import classes from './ProductCard.module.css'

  
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
    main: string; // Huvudkategori
    sub: string;  // Underkategori
  };
}


  interface ProductCardProps {
    product: IProduct;
  }

  
  const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
      setIsHovered(true);
    };
  
    const handleLeave = () => {
      setIsHovered(false);
    };
  
    
    return (
        <>
        <Card
      className={classes.card}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
  
       <Card.Section className={classes.imageSection}>
        {product.imageUrls && product.imageUrls.length > 0 && (
          <Image
            className={`${classes.cardImage} ${isHovered ? classes.hovered : ''}`}
            src={isHovered ? product.imageUrls[1] : product.imageUrls[0]}
            alt={product.name}
            h={350}
          />
        )}
      </Card.Section>
      <Card.Section className={classes.brandSection}>    
       <Text fw={400} size="xs" mt="md">{product.brand}</Text> 
       </Card.Section>
        <Card.Section className={classes.textSection}>
        <Text className={classes.cardName} fw={500} size="lg" mt="xs">{product.name}</Text>
        <Text className={classes.cardPrice} fw={450} size="md">{product.price} SEK</Text>
        </Card.Section>
        </Card>
      </>
    );
  };

export default ProductCard;
