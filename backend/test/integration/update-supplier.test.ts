// import request from "supertest";
// import app from "../../src"; // Adjust path to your Express app
// import Supplier from "../../src/Model/supplier.model"; // Adjust path to your Supplier model
// import mongoose from "mongoose";

// // Mock Supplier model methods
// jest.mock("../../src/Model/supplier.model");

// describe("PUT /supplier/update-supplier", () => {
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

//   it("should return 200 if supplier is updated successfully", async () => {
//     const response = await request(app)
//       .put("/supplier/update-supplier")
//       .send({
//         userId: "66daed32dd3a878c85a621c4",
//         name: "Supplier Y",
//         contact: "1234567890",
//         productCategory: "Updated Category",
//       });
//     expect(response.status).toBe(200);
//     expect(response.body.supplier).toEqual(
//       expect.objectContaining({
//         contact: "1234567890",
//         productCategory: "Updated Category",
//       })
//     );
//   });

//   it('should return 404 if supplier is not found', async () => {
//     const response = await request(app)
//       .put('/supplier/update-supplier')
//       .send({
//         userId: '66daed32dd3a878c85a621c5',
//         name: 'Nonexistent Supplier',
//         contact: '0000000000',
//         productCategory: 'Nonexistent Category',
//       });

//     expect(response.status).toBe(404);
//     expect(response.body.error).toBe('Supplier not found');
//   });

//   it("should return 500 if there is an internal server error", async () => {
//     mongoose.disconnect();
//     const response = await request(app)
//       .put("/supplier/update-supplier")
//       .send({
//         userId: "66daed32dd3a878c85a621c4",
//         name: "Error Supplier",
//         contact: "1111111111",
//         productCategory: "Error Category",
//       });
//     expect(response.status).toBe(500);
//     expect(response.body.error).toBe(
//       "An error occurred while updating the supplier"
//     );
//   });
// });
