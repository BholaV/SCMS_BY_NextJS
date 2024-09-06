// import request from 'supertest';
// import app from '../../src'; // Adjust path to your Express app
// import Supplier from '../../src/Model/supplier.model'; // Adjust path to your Supplier model
// import mongoose from 'mongoose';

// // Mock Supplier model methods
// jest.mock('../../src/Model/supplier.model');

// describe('POST /add-supplier', () => {
//     beforeAll(async () => {
//         await mongoose.connect(process.env.CONNECTION_LINK || 'mongodb://localhost:27017/test');
//     });

//     afterAll(async () => {
//         await mongoose.disconnect();
//     });

//     beforeEach(() => {
//         jest.clearAllMocks(); // Clear all mocks before each test
//     });

//     it('should return 201 if supplier already exists', async () => {
//         // Mock the Supplier.findOne method to return a supplier
//         const existingSupplier = {
//             name: 'Sudarshan',
//             contact: '8846455458',
//             productCategory: 'Pencil',
//         };

//         (Supplier.findOne as jest.Mock).mockResolvedValue(existingSupplier);

//         const response = await request(app)
//             .post('/supplier/add-supplier')
//             .send({ contact: '8846455458', name: 'Sudarshan', productCategory: 'Pencil' });

//         expect(response.status).toBe(201);
//         expect(response.body.message).toBe('Supplier already exists');
//         expect(response.body.data).toEqual(expect.objectContaining({
//             contact: '8846455458',
//         }));
//     });

//     it('should return 201 if supplier is successfully created', async () => {
//         // Mock the Supplier.findOne method to return null
//         (Supplier.findOne as jest.Mock).mockResolvedValue(null);

//         // Mock the Supplier.create method to return a new supplier
//         const newSupplier = {
//             name: 'Supplier A',
//             contact: '8119874513',
//             productCategory: 'bottel',
//         };

//         (Supplier.create as jest.Mock).mockResolvedValue(newSupplier);
//         const response = await request(app)
//             .post('/supplier/add-supplier')
//             .send({ contact: '8119874513', name: 'Supplier A', productCategory: 'bottel' });

//         expect(response.status).toBe(201);
//         expect(response.body.message).toBe('Supplier account created successfully');
//         expect(response.body.supplier).toEqual(expect.objectContaining({
//             contact: '8119874513',
//         }));
//     });

//     it('should return 500 if there is an internal server error', async () => {
//         // Mock the Supplier.findOne method to throw an error
//         (Supplier.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));
//         await mongoose.disconnect();
//         const response = await request(app)
//             .post('/supplier/add-supplier')
//             .send({ contact: '5555555555', name: 'Supplier C', productCategory: 'Clothing' });

//         expect(response.status).toBe(500);
//         expect(response.body.message).toBe('Error creating supplier');
//     });
// });
