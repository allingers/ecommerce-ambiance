// pages/products/index.tsx
import { useEffect, useState } from "react";
import ProductList from '../../components/ProductList/ProductList';
import { Box, Button, Center, MultiSelect } from "@mantine/core";
import  { IProduct }  from '../../components/ProductCard/ProductCard'; 
import classes from './ProductPage.module.css'


  const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/products');
          if (response.ok) {
            const data: IProduct[] = await response.json();
            setProducts(data);
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
        <Box className={classes.btnBox} >
        <Center>
         <Button.Group>
            <Button variant="default">First</Button>
            <Button variant="default">Second</Button>
            < Button variant="default">Third</Button>
        </Button.Group>
         <MultiSelect
            placeholder="Färger"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            defaultValue={['React']}
            clearable
        />
         </Center>
         </Box>

        <ProductList products={products} />
        </>
        
      );
    }

    export default ProductPage;