import request from 'supertest';
import app from '../../src'; // Adjust path to your Express app
import User from '../../src/Model/user.model'; // Adjust path to your User model
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import jwt for token creation if used in tests

// Mock User model methods
jest.mock('../../src/Model/user.model');

// Create a hashed password
const mockUser = {
    email: 'chandu@gmail.com',
    password: bcrypt.hashSync('123456', 10),
};

// Define your tests
describe('POST /user/signup', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.CONNECTION_LINK || 'mongodb://localhost:27017/test');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks before each test
    });

    it('should return 201 if user already exists', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);

        const response = await request(app)
            .post('/user/signup')
            .send({ email: 'chandu@gmail.com', password: '123456' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User already exists');
        expect(response.body.data).toEqual(expect.objectContaining({
            email: 'chandu@gmail.com',
        }));
    });

    it('should return 201 and a token if user is created successfully', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null); // Ensure no user is found
        (User.create as jest.Mock).mockResolvedValue({
            username: 'roman',
            email: 'roman@gmail.com',
            password: '123456',
        });
        const payload = {email:'roman@gmail.com'}
        // const token = jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: '7d' });
        const response = await request(app)
            .post('/user/signup')
            .send({ username:"roman",email: 'roman@gmail.com', password: '123456' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created successfully');
        expect(response.body.user).toEqual(expect.objectContaining({
            email: 'roman@gmail.com',
        }));
        // expect(response.body.token).toBe(token); // Ensure token is returned
    });

    it('should return 500 if there is an internal server error', async () => {
        (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));
        await mongoose.disconnect();
        const response = await request(app)
            .post('/user/signup')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error creating user');
    });
});
