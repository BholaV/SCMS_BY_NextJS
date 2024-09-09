// import Order from "../../src/Model/order.model";
// import mongoose from "mongoose";
// import app from "../../src";
// import request from 'supertest';

// jest.mock('../../src/Model/order.model');

// describe("PUT /order/updateOrder/:id", () => {
//     beforeAll(async () => {
//         await mongoose.connect(
//             process.env.CONNECTION_LINK || "mongodb://localhost:27017/test"
//         );
//     });

//     afterAll(async () => {
//         await mongoose.disconnect();
//     });

//     beforeEach(() => {
//         jest.clearAllMocks(); // Clear all mocks before each test
//     });

//     it('should return 404 if order is not found', async () => {
//         const response = await request(app)
//             .put('/order/updateOrder/66de9764faa83c74f19e62a9') // Example ID
//             .send({ status: 'Out for delivery' });
//         expect(response.status).toBe(404);
//         expect(response.body.message).toBe('Order not found');
//     });

//     it('should return 200 if Order is successfully updated', async () => {
//         const response = await request(app)
//             .put('/order/updateOrder/66de9764faa83c74f19e62a7') // Example ID
//             .send({ status: 'Out for delivery' });
//         expect(response.status).toBe(200);
//         expect(response.body.message).toBe('Order updated successfully');
//         expect(response.body.updatedOrder).toEqual(expect.objectContaining({
//             status:"Out for delivery",_id:"66de9764faa83c74f19e62a7"
//         }));
//     });

//     it('should return 500 if there is an internal server error', async () => {
//         mongoose.disconnect();
//         const response = await request(app)
//             .put('/order/updateOrder/60c72b2f4f1a2c001f8e4f54') // Example ID
//             .send({ status: 'Out for delivery' });
//         expect(response.status).toBe(500);
//         expect(response.body.message).toBe('Internal Server Error');
//     });
// });
