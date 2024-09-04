import { Request, Response, NextFunction } from 'express';
import Product from '../Model/product.model';
import { Types } from 'mongoose';

// Interface for the product item in the request body
interface IProductItem {
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    thumbnail?: string;
    category: string;
    images?: string[];
}

// Interface for the request body in `addProductInBulk`
interface AddProductInBulkRequest extends Request {
    body: IProductItem[];
}

// Add products in bulk
export const addProductInBulk = async (req: AddProductInBulkRequest, res: Response, next: NextFunction) => {
    const productList = req.body;

    try {
        for (const item of productList) {
            const { title, description, price, discountPercentage, rating, stock, brand, thumbnail, category } = item;
            const images = item.images || [];

            // Create and save the product in MongoDB
            const newProduct = new Product({
                title,
                description,
                price,
                discountPercentage,
                rating,
                stock,
                brand,
                thumbnail,
                categoryName: category,
                images
            });
            await newProduct.save();
        }
        return res.status(200).json({ message: "Products added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// View all products
export const viewAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Product.find();
        return res.status(200).json({ message: "Products", result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get products with low stock
export const getLowStockProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lowStockProducts = await Product.find({ stock: { $lt: 10 } });
        return res.status(200).json(lowStockProducts);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Remove stock from a product
export const removeStock = async (req: Request<{ productId: string }>, res: Response) => {
    const { productId } = req.params;

    try {
        const product:any = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.stock <= 0) {
            return res.status(400).json({ message: "Out of stock" });
        }

        product.stock -= 1;
        await product.save();
        return res.status(200).json({ message: "Product stock updated", product });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Add stock to a product
export const addStock = async (req: Request<{ productId: string }>, res: Response) => {
    const { productId } = req.params;

    try {
        const product:any = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.stock += 1;
        await product.save();
        return res.status(200).json({ message: "Product stock updated", product });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Check stock of a product
export const checkStock = async (req: Request<{ productId: string }>, res: Response) => {
    const { productId } = req.params;

    try {
        const product:any = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ stockAvailable: product.stock > 0 });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
