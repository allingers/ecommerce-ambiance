// ProductList.tsx
import React from 'react';
import ProductCard from '../ProductCard/ProductCard'; 
import  {Product}  from '../ProductCard/ProductCard'; 
import classes from './ProductList.module.css'; 
import { Center, Container, createTheme } from '@mantine/core';

interface ProductListProps {
  products: Product[];
}


const ProductList: React.FC<ProductListProps> = ({ products }) => {

    const demoProps = {
        bg: 'var(--mantine-color-blue-light)',
        h: 50,
        mt: 'md',
      };

  return (
    <Container fluid className={classes.productList}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Container>

  );
};

export default ProductList;

