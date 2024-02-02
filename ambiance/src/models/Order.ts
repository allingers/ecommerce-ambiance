// Order.ts
import mongoose, { Document } from 'mongoose'

interface Order {
	products: Array<{ productId: string; quantity: number; price: number }>
	user: string
	totalAmount: number
	createdAt: Date
	status: string
	isGuestOrder: boolean
}

interface OrderModel extends Order, Document {}

const OrderSchema = new mongoose.Schema({
	products: [
		{
			productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
			quantity: { type: Number, required: true },
			price: { type: Number, required: true },
		},
	],
	user: { type: String, required: true },
	totalAmount: { type: Number, required: true },
	isGuestOrder: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	status: { type: String, default: 'Bekräftad' },
})

const Order =
	(mongoose.models.Order as mongoose.Model<OrderModel>) ||
	mongoose.model<OrderModel>('Order', OrderSchema)

export default Order
export type { OrderModel }
