import request from 'supertest';
import app from '../../src/index'; // Adjust the path to your Express app
import User from '../../src/Model/user.model'; // Adjust the path to your User model
import jwt from 'jsonwebtoken';

// Mock the User model
jest.mock('../../src/Model/user.model', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

// Mock the jwt sign function
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('POST /signup', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    (User.findOne as jest.Mock).mockClear();
    (User.create as jest.Mock).mockClear();
    (jwt.sign as jest.Mock).mockClear();
  });

  it('should create a new user and return a token', async () => {
    const mockUser = { _id: '1', email: 'test@example.com' };
    const mockToken = 'mockToken';

    // Mock the behavior of User.findOne and User.create
    (User.findOne as jest.Mock).mockResolvedValue(null); // No user found
    (User.create as jest.Mock).mockResolvedValue(mockUser); // Create user

    // Mock the behavior of jwt.sign
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const response = await request(app)
      .post('/user/signup') // Adjust the endpoint path
      .send({ email: 'test@example.com', password: 'password123' }); // Adjust request payload

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body).toHaveProperty('user', mockUser);
    expect(response.body).toHaveProperty('token', mockToken);
  });

  it('should return 409 if user already exists', async () => {
    const existingUser = { _id: '1', email: 'test@example.com' };

    // Mock the behavior of User.findOne
    (User.findOne as jest.Mock).mockResolvedValue(existingUser); // User already exists

    const response = await request(app)
      .post('/user/signup') 
      .send({ email: 'test@example.com', password: 'password123' }); 

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message', 'User already exists');
    expect(response.body).toHaveProperty('data', existingUser);
  });

  it('should return 500 on server error', async () => {
    // Mock the behavior of User.findOne and User.create to throw an error
    (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));
    (User.create as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/user/signup')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error creating user');
  });
});
  