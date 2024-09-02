import mongoose, { Schema, Document } from 'mongoose';

// Interface for the Order document
interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    date: Date;
    status: 'Order Confirmed' | 'Order Shipped' | 'Out for delivery' | 'Delivered';
}

// Schema definition for Order
const OrderSchema: Schema<IOrder> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    date: { type: Date, default: Date.now },
    status: { 
        type: String, 
        enum: ['Order Confirmed', 'Order Shipped', 'Out for delivery', 'Delivered'], 
        default: 'Order Confirmed' 
    }
});

// Create and export the Order model
const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
