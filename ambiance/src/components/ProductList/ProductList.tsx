// ProductList.tsx
// Listar produktkorten
import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { Center, Container, SimpleGrid } from '@mantine/core'
import { ProductModel } from '@/models/Product'

interface ProductListProps {
	products: ProductModel[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
	return (
		<Container size="xxl" pt={35} pb={35}>
			<Center>
				<SimpleGrid
					cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
					spacing={{ base: 10, sm: 'xl', md: 'lg', lg: 'xl' }}
					verticalSpacing={{ base: 'md', sm: 'xl' }}>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>
			</Center>
		</Container>
	)
}

export default ProductList
