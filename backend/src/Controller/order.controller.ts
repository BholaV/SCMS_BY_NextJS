import { Request, Response, NextFunction } from 'express';
import Order from '../Model/order.model';
import { Types } from 'mongoose';

// Create a new order
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Order.create(req.body);
        res.status(200).json({ message: 'Order placed successfully...', result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

// View orders by user ID
export const viewOrder = async (req: Request<{ userId: string }>, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        // Find orders by userId and populate user and product details
        const orders = await Order.find({ userId: new Types.ObjectId(userId) })
            .populate('userId')   
            .populate('productId') 
            .exec();
        
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

// Update order status by order ID
export const updateOrder = async (req: Request<{ id: string }, {}, { status: string }>, res: Response, next: NextFunction) => {
    const orderId = req.params.id;
    const newStatus = req.body.status;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { $set: { status: newStatus } }, { new: true }).exec();
        if (!updatedOrder) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.status(200).json({ message: 'Order updated successfully', updatedOrder });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};

// Remove an order by ID
export const removeOrder = async (req: Request<{ orderId: string }>, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    console.log(orderId + " orderId");
    try {
        const order = await Order.findOneAndDelete({ _id: new Types.ObjectId(orderId) }).exec();
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Order deleted successfully", order });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting order", error: err });
    }
};
