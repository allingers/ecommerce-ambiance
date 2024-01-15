// ProductList.tsx
import React from 'react';
import ProductCard from '../ProductCard/ProductCard'; 
import  {IProduct}  from '../ProductCard/ProductCard'; 
import classes from './ProductList.module.css'; 
import { Center, Container, SimpleGrid, createTheme } from '@mantine/core';

interface ProductListProps {
  products: IProduct[];
}


const ProductList: React.FC<ProductListProps> = ({ products }) => {


  return (
    <div className={classes.productListContainer}>
      <SimpleGrid
      cols={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
      </SimpleGrid>
    </div>
  );
};

export default ProductList;

