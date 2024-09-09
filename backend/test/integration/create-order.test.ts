// import request from "supertest";
// import app from "../../src/index"; // Import your Express app
// import Order from "../../src/Model/order.model"; // Import your Order model
// import mongoose from "mongoose";
// // Mock the Order model
// jest.mock("../../src/Model/order.model");

// // Test suite for createOrder endpoint
// describe("POST /order/create-order", () => {
//   beforeAll(async () => {
//     await mongoose.connect(
//       process.env.CONNECTION_LINK || "mongodb://localhost:27017/test"
//     );
//   });

//   afterAll(async () => {
//     await mongoose.disconnect();
//   });

//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear all mocks before each test
//   });
//   it("should create a new order successfully", async () => {
//     // Mock the Order.create method to return a successful result
//     const mockOrder = {
//       userId: "66c878a8400a056b0d670a42",
//       productId: "66c061234e63f767f7df07a8",
//       status: "Order Confirmed",
//     };

//     (Order.create as jest.Mock).mockResolvedValue(mockOrder);

//     const response = await request(app).post("/order/create-order").send({
//       userId: mockOrder.userId,
//       productId: mockOrder.productId,
//       status: mockOrder.status,
//     });

//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("Order placed successfully...");
//     expect(response.body.result).toEqual(
//       expect.objectContaining({
//         userId: mockOrder.userId,
//         productId: mockOrder.productId,
//       })
//     );
//   });

//   it("should return 500 if there is an error creating the order", async () => {
//     // Mock the Order.create method to throw an error
//     const errorMessage = "Internal server error";
//     (Order.create as jest.Mock).mockRejectedValue(new Error(errorMessage));
//     mongoose.disconnect();
//     const response = await request(app).post("/order/create-order").send({
//       userId: "66c878a8400a056b0d670a42",
//       productId: "66c061234e63f767f7df07a8",
//       date: new Date(),
//       status: "Order Shipped",
//     });
//     expect(response.status).toBe(500);
//     expect(response.body.message).toBe(errorMessage);
//   });
// });
