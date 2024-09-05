import request from 'supertest';
import app from './src';
import Product from './src/Model/product.model';
import mongoose from 'mongoose';

// Mock Product model methods
jest.mock('./src/Model/product.model');

describe('Product API', () => {
    let server: any;
    let port: number = Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024; // Use random port

    beforeAll(async () => {
        await mongoose.connect(process.env.CONNECTION_LINK || 'mongodb://localhost:27017/test', {
            // Use default options for recent Mongoose versions
        });

        server = app.listen(port, () => {
            console.log(`Test server started on port ${port}...`);
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close(); // Ensure server is closed properly
    });

    // Tests go here
});
