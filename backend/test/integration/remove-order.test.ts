// import Order from "../../src/Model/order.model";
// import mongoose from "mongoose";
// import app from "../../src";
// import request from 'supertest';
// jest.mock('../../src/Model/order.model');


// describe("DELETE",()=>{
//     beforeAll(async () => {
//         await mongoose.connect(
//           process.env.CONNECTION_LINK || "mongodb://localhost:27017/test"
//         );
//       });
//       afterAll(async () => {
//         await mongoose.disconnect();
//       });
//       beforeEach(() => {
//         jest.clearAllMocks(); // Clear all mocks before each test
//       });

//       it('should return 404 if order is not found', async () => {
//         const response = await request(app)
//             .delete('/order/removeOrder/66de967d09c88eeeebd0f200') // Example ID
//             .send();
//         expect(response.status).toBe(404);
//         expect(response.body.message).toBe('Order not found');
//     });

//     it('should return 200 if Order is successfully deleted', async () => {
//         const response = await request(app)
//             .delete('/order/removeOrder/66de96f9437f5dfb02ad1a5d') // Example ID
//             .send();
//         expect(response.status).toBe(200);
//         expect(response.body.message).toBe('Order deleted successfully');
//     });

//     it('should return 500 if there is an internal server error', async () => {
//         mongoose.disconnect();
//         const response = await request(app)
//             .delete('/order/removeOrder/60c72b2f4f1a2c001f8e4f54') // Example ID
//             .send();
//         expect(response.status).toBe(500);
//         expect(response.body.message).toBe('Error deleting order');
//     });
// })