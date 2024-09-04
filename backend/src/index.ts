import express, { Express } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRouter from './Router/user.router';
import SupplierRouter from './Router/supplier.routes';
import ProductRoute from './Router/product.routes';
import OrderRoute from './Router/order.routes';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const app: Express = express();

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
// app.use(cookieParser()); // Parse cookies

// Route handling
app.use("/user", UserRouter); // Route for user-related endpoints
app.use("/supplier", SupplierRouter); // Route for supplier-related endpoints
app.use("/product", ProductRoute); // Route for product-related endpoints
app.use("/order", OrderRoute); // Route for order-related endpoints

// Database connection and server startup
const link: string | undefined = process.env.CONNECTION_LINK; // MongoDB connection string

if (link) {
    mongoose.connect(link)
        .then(() => {
            console.log("Connected to MongoDB");
            app.listen(3002, () => {
                console.log("Server started on port 3002...");
            });
        })
        .catch(err => {
            console.error("Error connecting to MongoDB:", err);
        });
} else {
    console.error("No MongoDB connection string found in environment variables.");
}
