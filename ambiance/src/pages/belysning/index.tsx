// pages/belysning/index.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductList from '../../components/ProductList/ProductList';
import { IProduct } from '../../components/ProductCard/ProductCard';
import { Box, Button, Overlay, Title, Flex } from '@mantine/core';
import classes from '../../styles/ProductPage.module.css'

const BelysningPage: React.FC = () => {
  const router = useRouter();
  const { subcategory } = router.query;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data: IProduct[] = await response.json();

          // Filtrera produkter baserat på kategorin "Belysning"
          const filteredProducts = data.filter((product) =>
            product.categories.main.toString() === '659fa7c0da35295622598398'
            );


          setProducts(filteredProducts);
        } else {
          setError('Error fetching products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
  <>
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />
      <div className={classes.inner}>
        <Title className={classes.title}>
         Belysning{' '}
        </Title>
      </div>
    </div>
    <Box className={classes.btnBox} >
    <Flex
      mih={60}
      gap="xl"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Button 
      variant="outline" 
      color="rgba(18, 18, 18, 1)" 
      radius="xs"
      
      >
        Taklampor
        </Button>
        <Button 
      variant="outline" 
      color="rgba(18, 18, 18, 1)" 
      radius="xs"
      >
        Bordslampor
        </Button>
        <Button 
      variant="outline" 
      color="rgba(18, 18, 18, 1)" 
      radius="xs"
      >
        Dekorativ Belysning
        </Button>
        <Button 
      variant="outline" 
      color="rgba(18, 18, 18, 1)" 
      radius="xs"
      >
        Golvlampor
        </Button>
        <Button
        variant="outline" 
        color="rgba(18, 18, 18, 1)" 
        radius="xs"
        >
           Vägglampor
            </Button>
    </Flex>
    </Box>
    <ProductList products={products} />
    </>
  );
};

export default BelysningPage;
