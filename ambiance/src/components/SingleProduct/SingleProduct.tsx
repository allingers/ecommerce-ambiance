// components/ProductDetail.tsx
import React from 'react';
import { ProductModel } from '@/models/Product';
import { Carousel } from '@mantine/carousel';
import classes  from './SingleProduct.module.css'
import { Text, Center, Container, Image, SimpleGrid, Title } from '@mantine/core';

interface ProductDetailProps {
  product: ProductModel;
}

const SingleProduct: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <> 
    <Container>
    <Center>
        <SimpleGrid 
        className={classes.wrapper}
        cols={{ base: 1, md:2, sm:2 }}
        spacing={{ base: 10, sm: 'xl' }}
        >
         <div className={classes.CarouselContainer}>
            <Carousel
            height={400} 
            w={400}
            loop
            withIndicators
            >
            {product.imageUrls.map((url, index) => (
            <Carousel.Slide key={index}>
                <Image h={400}fit="cover" src={url} alt={`Product Image ${index + 1}`} />
            </Carousel.Slide>
            ))}
            </Carousel>
            </div>
        <div className={classes.ProductInfo}>
            <Text>{product.brand}</Text>
            <Title order={2}>{product.name}</Title>
            <Text>{product.description}</Text>
            <Text fw={'bold'} mt={10}>{product.price} SEK</Text>
            {/* <Text>I Lager {product.inStock} st</Text> */}
            <Text fw={200} mt={10}> Kategori: {product.categories.main} -  Underkategori: {product.categories.sub}</Text>

        </div>
        </SimpleGrid>
      </Center>
      </Container>


    </>
  );
};

export default SingleProduct;
