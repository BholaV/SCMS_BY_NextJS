// import request from 'supertest';
// import app from '../../src'; // Adjust path to your Express app
// import Supplier from '../../src/Model/supplier.model'; // Adjust path to your Supplier model
// import mongoose from 'mongoose';

// // Mock Supplier model methods
// jest.mock('../../src/Model/supplier.model');

// describe('DELETE /remove-supplier/:id', () => {
//     beforeAll(async () => {
//         await mongoose.connect(process.env.CONNECTION_LINK || 'mongodb://localhost:27017/test');
//     });

//     afterAll(async () => {
//         await mongoose.disconnect();
//     });

//     beforeEach(() => {
//         jest.clearAllMocks(); // Clear all mocks before each test
//     });

//     it('should return 404 if supplier is not found', async () => {
//         const response = await request(app)
//             .delete('/supplier/remove-supplier/66daede929c7374e94a39eeb') // Example ID
//             .send();

//         expect(response.status).toBe(404);
//         expect(response.body.message).toBe('Supplier not found');
//     });

//     it('should return 200 if supplier is successfully deleted', async () => {
//         const response = await request(app)
//             .delete('/supplier/remove-supplier/66daed32dd3a878c85a621c4') // Example ID
//             .send();

//         expect(response.status).toBe(200);
//         expect(response.body.message).toBe('Supplier deleted successfully');
//     });

//     it('should return 500 if there is an internal server error', async () => {
//         // Mock the Supplier.findOneAndDelete method to throw an error
//         (Supplier.findOneAndDelete as jest.Mock).mockRejectedValue(new Error('Database error'));
//         mongoose.disconnect();
//         const response = await request(app)
//             .delete('/supplier/remove-supplier/60c72b2f4f1a2c001f8e4f54') // Example ID
//             .send();
//         expect(response.status).toBe(500);
//         expect(response.body.message).toBe('Error deleting supplier');
//     });
// });
