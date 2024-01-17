// pages/product/[productId].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ProductModel } from '@/models/Product';
import SingleProduct from '@/components/SingleProduct/SingleProduct';

const SingleProductPage: React.FC = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [product, setProduct] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await fetch(`/api/product/${productId}`);
        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message || 'Unknown error occurred');
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductById();
    }
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
   <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {product && (
     <SingleProduct key={product._id} product={product}/>
      )}
    </>
  );
};

export default SingleProductPage;