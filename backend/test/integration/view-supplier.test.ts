import request from "supertest";
import app from "../../src"; // Adjust path to your Express app
import Supplier from "../../src/Model/supplier.model"; // Adjust path to your Supplier model
import mongoose from "mongoose";

// Mock Supplier model methods
jest.mock("../../src/Model/supplier.model");

describe("GET /view-all-suppliers", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.CONNECTION_LINK || "mongodb://localhost:27017/test"
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it("should return 200 and the list of all suppliers", async () => {
    // Mock the Supplier.find method to return an array of suppliers
    const mockSuppliers = [
      {
        _id: "66d69b6f5ae0d015d98c68e1",
        contact: "7895459685",
        name: "Rohit",
        productCategory: "Mouse",
      },
      {
        _id: "66d6d932e61bd8cef97c4e7a",
        contact: "9435423453",
        name: "Aman Yadav",
        productCategory: "Book",
      },
      {
        _id: "66d6d94de61bd8cef97c4e7f",
        contact: "8846455458",
        name: "Sudarshan",
        productCategory: "Pencil",
      },
      {
        _id: "66dad6dbcec0ed0b6c690434",
        contact: "0987654321",
        name: "Supplier B",
        productCategory: "Furniture",
      },
      {
        _id: "66dad8f3776572a7628e5dec",
        contact: "0987654324",
        name: "Supplier B",
        productCategory: "Furniture",
      },
      {
        _id: "66dae998e17b3d801626cfb6",
        contact: "9987654324",
        name: "Supplier C",
        productCategory: "Furniture",
      },
      {
        _id: "66daeb249187290b0486e05b",
        contact: "8109874585",
        name: "Supplier X",
        productCategory: "books",
      },
      {
        _id: "66daec8f8f7bc0e9d8b0f68d",
        contact: "8119874585",
        name: "Supplier X",
        productCategory: "books",
      },
      {
        _id: "66daed32dd3a878c85a621c4",
        contact: "8119874588",
        name: "Supplier Y",
        productCategory: "books",
      },
    ];

    (Supplier.find as jest.Mock).mockResolvedValue(mockSuppliers);

    const response = await request(app)
      .get("/supplier/view-all-suppliers")
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("All Suppliers");
    expect(response.body.suppliers).toEqual(mockSuppliers);
  });

  it("should return 500 if there is an internal server error", async () => {
    // Mock the Supplier.find method to throw an error
    (Supplier.find as jest.Mock).mockRejectedValue(new Error("Database error"));
    await mongoose.disconnect();
    const response = await request(app)
      .get("/supplier/view-all-suppliers")
      .send();

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Something went wrong");
  });
});
