// pages/dekoration/index.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductList from '../../components/ProductList/ProductList';
import { IProduct } from '../../components/ProductCard/ProductCard';
import { Box, Text, Button, Center, Container, MultiSelect, Overlay, Title, Flex, AppShell, Burger } from '@mantine/core';
import classes from '../../styles/ProductPage.module.css'
import cx from 'clsx';
import { useDisclosure } from '@mantine/hooks';

const DekorationPage: React.FC = () => {
  const router = useRouter();
  const { subcategory } = router.query;
  const [opened, { toggle }] = useDisclosure();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data: IProduct[] = await response.json();

          // Filtrera produkter baserat på kategorin "Dekoration"
          const filteredProducts = data.filter((product) =>
            product.categories.main.toString() === '659fa783da35295622598395'
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
  
     <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />
      <div className={classes.inner}>
        <Title className={classes.title}>
          Dekoration{' '}
        </Title>
        {/* <div className={classes.controls}>
          <Button className={cx(classes.control, classes.secondaryControl)} size="md">
            Live demo
          </Button>
        </div> */}
      </div>
    </div>
    <AppShell.Main>
    {/* <Box className={classes.btnBox} >
    <Flex
      mih={60}
      gap="md"
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
        Posters
        </Button>
      <Button 
      variant="outline" 
      color="rgba(18, 18, 18, 1)" 
      radius="xs"
      >
        Skulpturer
        </Button>
      <Button 
      variant="outline" 
      color="rgba(18, 18, 18, 1)" 
      radius="xs"
      >
        Vaser</Button>
      <Button 
      variant="outline" 
      color="rgba(18, 18, 18, 1)" 
      radius="xs"
      >
        Krukor</Button>
      <Button
        variant="outline" 
        color="rgba(18, 18, 18, 1)" 
        radius="xs"
        >
            Dekorativa Accessoarer</Button>
    </Flex>
    </Box> */}

    <ProductList products={products} />
    </AppShell.Main>
    </AppShell>
  );
};

export default DekorationPage;
