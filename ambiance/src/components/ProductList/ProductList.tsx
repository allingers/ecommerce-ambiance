// ProductList.tsx
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';  // Uppdatera sökvägen
import classes from './ProductList.module.css'; 
import { Box, SimpleGrid } from '@mantine/core';
import { ProductModel } from '@/models/Product';

interface ProductListProps {
  products: ProductModel[]; // Uppdatera gränssnittet
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  console.log('Received products:', products);

  return (
    <Box className={classes.productListContainer}>
      <SimpleGrid
        pt={10}
        cols={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      > 
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid> 
    </Box>
  );
};

export default ProductList;
