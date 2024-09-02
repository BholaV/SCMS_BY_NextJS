import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Product
interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    discountPercentage?: number; // Optional
    stock?: number; // Optional
    brand?: string; // Optional
    rating?: number; // Optional
    categoryName?: string; // Optional
    thumbnail?: string; // Optional
    images?: string[]; // Optional
    createdAt?: Date; // Optional, added by timestamps
    updatedAt?: Date; // Optional, added by timestamps
}

// Define the Product schema
const productSchema: Schema<IProduct> = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 500,
    },
    description: {
        type: String,
        required: true,
        maxlength: 5000,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    brand: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    categoryName: {
        type: String,
        ref: 'Category',
    },
    thumbnail: {
        type: String,
    },
    images: [{
        type: String,
    }],
}, {
    timestamps: true,
});

// Create and export the Product model
const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
