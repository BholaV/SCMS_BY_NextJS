import express, { Express } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRouter from './Router/user.router';
import SupplierRouter from './Router/supplier.routes';
import ProductRoute from './Router/product.routes';
import OrderRoute from './Router/order.routes';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './Connect_DB/db_config';

// Load environment variables from .env file
config();

const app: Express = express();

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Route handling
app.use("/user", UserRouter); // Route for user-related endpoints
app.use("/supplier", SupplierRouter); // Route for supplier-related endpoints
app.use("/product", ProductRoute); // Route for product-related endpoints
app.use("/order", OrderRoute); // Route for order-related endpoints

// Database connection and server startup
const port = process.env.PORT || 3002; // Use environment port or default to 3002

const startServer = async () => {
    try {
        await connectDB(); // Ensure DB is connected
        app.listen(port, () => {
            console.log(`Server started on port ${port}...`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1); // Exit process with failure
    }
};
startServer();
export { startServer }; // Export startServer for testing or further configuration
export default app; // Export the app itself
