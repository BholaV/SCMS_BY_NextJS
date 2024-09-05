import request from 'supertest';
import app from '../../src'; // Adjust the path to your Express app
import Product from '../../src/Model/product.model'; // Adjust the path to your Product model
import mongoose from 'mongoose';

// Mock Product model methods
jest.mock('../../src/Model/product.model');

describe('GET /view-all-products', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.CONNECTION_LINK || 'mongodb://localhost:27017/test', {
            // Use default options for recent Mongoose versions
        });
    });

    afterAll(async () => {
        // Close the database connection and server
        await mongoose.connection.close();
    });

    it('should return 500 if there is an internal server error', async () => {
        // Mock the Product.find method to throw an error
        (Product.find as jest.Mock).mockRejectedValue(new Error('Database error'));
    
        const response = await request(app)
            .get('/view-all-products')
            .expect('Content-Type', /json/)
            .expect(500);
    
        expect(response.body.message).toBe('Internal server error');
    });
    
});
