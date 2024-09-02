import express, { Router } from 'express';
import { addSupplier, removeSupplier, updateSupplier, ViewAllSupplier } from '../Controller/supplier.controller';

const router: Router = express.Router();

// Route to add a new supplier
router.post('/add-supplier', addSupplier);

// Route to remove a supplier by ID
router.delete('/remove-supplier/:id', removeSupplier);

// Route to view all suppliers
router.get('/view-all-suppliers', ViewAllSupplier);

// Route to update supplier details
router.put('/update-supplier', updateSupplier);

export default router;
