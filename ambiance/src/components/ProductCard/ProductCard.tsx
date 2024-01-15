// ProductCard.tsx
import React, { useState } from 'react';
import { Card, Text, Image, Group, Box } from '@mantine/core';
import classes from './ProductCard.module.css'
import { TbHeart, TbShoppingBag, TbShoppingBagPlus } from 'react-icons/tb';

  
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
        shadow="xs" 
        radius="xs" 
        padding="xl"
        h={473.55}
        w={358.75}
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
      <Card.Section pl={10} color='#8b8989'>    
       <Text fw={400} size="xs" mt="md">{product.brand}</Text> 
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Card.Section pl={10} mb={10}>
          <Text fw={450} size="lg" mt="xs">{product.name}</Text>
          <Text fw={500} size="md">{product.price} SEK</Text>
        </Card.Section>
        <Card.Section className={classes.iconSection} pl={10} mb={10}>
        <Text className={classes.cartIcon} ><TbShoppingBag /></Text> 
        <Text className={classes.favIcon}><TbHeart /></Text> 
        </Card.Section>
        </Group>
      </Card>
    </>
    );
  };

export default ProductCard;
