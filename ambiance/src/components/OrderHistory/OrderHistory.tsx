// OrderHistoryComponent.tsx
import { OrderModel } from '@/models/Order'
import {
	Box,
	Card,
	Collapse,
	Container,
	Divider,
	List,
	SimpleGrid,
	Text,
	Title,
} from '@mantine/core'
import React, { useState } from 'react'
import classes from './OrderHistory.module.css'
import { IoMdArrowDropdown } from 'react-icons/io'

interface OrderHistoryComponentProps {
	orders: OrderModel[]
}

const OrderHistoryComponent: React.FC<OrderHistoryComponentProps> = ({
	orders,
}) => {
	// const [opened, { toggle }] = useDisclosure(false)
	const [openedOrders, setOpenedOrders] = useState<Record<string, boolean>>({})

	const toggleCollapse = (orderId: string) => {
		setOpenedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }))
	}

	return (
		<Container size="lg" pt={20}>
			<SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={20}>
				{Array.isArray(orders) && orders.length > 0 ? (
					orders.map((order) => (
						<Card className={classes.OrderCard} key={order._id}>
							<Box className={classes.OrderCardBox}>
								<Title order={4}>Order ID: {order._id}</Title>
								<Divider pb={7} mt={3} />
								<Text className={classes.OrderText}>
									Totalt belopp: {order.totalAmount} SEK
								</Text>
								<Text className={classes.OrderText}>
									Status: {order.status}
								</Text>
								<Text className={classes.OrderText}>
									Skapad: {new Date(order.createdAt).toLocaleString()}
								</Text>
							</Box>

							<Box className={classes.OrderSubTitleGroup}>
								<Text
									className={classes.OrderSubTitle}
									onClick={() => toggleCollapse(order._id)}>
									Produkter
								</Text>
								<span>
									<IoMdArrowDropdown />
								</span>
							</Box>
							<Collapse in={openedOrders[order._id]}>
								<List>
									{order.products.map((product, index) => (
										<List.Item key={index}>
											Produkt ID: {product.productId}, Antal: {product.quantity}
											, Pris: {product.price}
										</List.Item>
									))}
								</List>
							</Collapse>
						</Card>
					))
				) : (
					<p>Inga tidigare ordrar.</p>
				)}
			</SimpleGrid>
		</Container>
	)
}

export default OrderHistoryComponent
