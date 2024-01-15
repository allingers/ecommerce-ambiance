// ProductCard.tsx
import React, { useState } from 'react';
import { Card, Text, Image, Group } from '@mantine/core';
import classes from './ProductCard.module.css'
import { TbHeart, TbShoppingBag} from 'react-icons/tb';
import { ProductModel } from '@/models/Product';

  
// export interface IProduct {
//   _id?: string;
//   name: string;
//   slug: string;
//   description: string;
//   imageUrls: string[];
//   price: number;
//   brand: string;
//   color: string;
//   inStock: string;
//   categories: {
//     main: string; 
//     sub: string;  
//   };
// }

//   interface ProductCardProps {
//     product: IProduct;
//   }

interface ProductCardProps {
  product: ProductModel;
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
        shadow="xs" 
        radius="xs" 
        padding="xl"
        h={473.55}
        w={358.75}
       onMouseEnter={handleHover}
       onMouseLeave={handleLeave}
      >
        <Card.Section pl={10} color='#8b8989'>
          <Text fw={400} size="xs" mt="md">{product.brand}</Text> 
        </Card.Section>
        <Card.Section className={classes.imageSection}>
        {product.imageUrls && product.imageUrls.length > 0 && (
          <Image
            className={`${classes.cardImage} ${isHovered ? classes.hovered : ''}`}
            src={isHovered ? product.imageUrls[1] : product.imageUrls[0]}
            alt={product.name}
            fit={isHovered ? "cover": "contain"}
            height={isHovered ? "300" : "250"}
          />
        )}
        </Card.Section>
        <Group justify="space-between" mt="md">
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
