import request from "supertest";
import app from "../../src"; // Adjust path to your Express app
import User from "../../src/Model/user.model"; // Adjust path to your User model
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Mock User model methods
jest.mock("../../src/Model/user.model");

// Create a hashed password
const mockUser = {
  email: "chandu@gmail.com",
  password: bcrypt.hashSync("123456", 10),
};

// Define your tests
describe("POST /user/signin", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.CONNECTION_LINK || "mongodb://localhost:27017/test"
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it("should return 401 if user does not exist", async () => {
    const response = await request(app)
      .post("/user/signin")
      .send({ email: "sumit@gmail.com", password: "123456" });
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Unauthorized user");
  });

  it("should return 401 if password is invalid", async () => {
    const response = await request(app)
      .post("/user/signin")
      .send({ email: "chandu@gmail.com", password: "154646" });
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid password");
  });

  it("should return 200 if user signs in successfully", async () => {
    const response = await request(app)
      .post("/user/signin")
      .send({ email: "chandu@gmail.com", password: "123456" });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User signed in successfully");
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: "chandu@gmail.com",
      })
    );
  });

  it("should return 500 if there is an internal server error", async () => {
    await mongoose.disconnect();
    const response = await request(app)
      .post("/user/signin")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Internal server error");
  });
});
