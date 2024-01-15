import React, { useEffect, useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Drawer, Title, Text, Box, Image, Divider, Grid, rem, UnstyledButton } from '@mantine/core';
import { ProductModel } from '@/models/Product';
import classes from './CartDrawer.module.css'
import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductModel[];
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { cartItems } = useCart();

  const fetchProductDetails = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    // Hämta produktinformation när komponenten mountar eller när cartItems ändras
    fetchProductDetails();
  }, [cartItems]);



  return (
    <Drawer opened={isOpen} onClose={onClose} position="right" size="md">
   <Title order={2}>Varukorg</Title>
      <Drawer.Body>
        {cartItems &&
          cartItems.map((item, index) => {
            const product = products.find((p) => p._id === item.productId);

            if (!product) {
              return null; // Skip rendering if product is not found
            }

            return (
              <div key={index} className={classes.cartItemContainer}>
                   <div className={classes.cartItem}>
                  <Image src={product.imageUrls[0]} alt={product.name} width={60} height={60} className={classes.image} />
                    <Text>{product.name}</Text>
                    <Text className={classes.price}>{product.price} SEK</Text>
                  </div>
                  <div className={classes.quantityContainer}>
                    <UnstyledButton className={classes.icon}><VscDiffRemoved /></UnstyledButton>
                    <Text className={classes.quantity}>{item.quantity} st</Text>
                    <UnstyledButton className={classes.icon}><VscDiffAdded /></UnstyledButton>
                  </div>
              </div>
            );
          })}
       </Drawer.Body>
    </Drawer>
  );
};

export default CartDrawer;
