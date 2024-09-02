import { Request, Response, NextFunction } from 'express';
import Supplier from '../Model/supplier.model';
import { ObjectId } from 'mongoose';

// interface FindByEmailRequestBody {
//     email: string;
// }
// Add Supplier API
export const addSupplier = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
        const data = await Supplier.findOne({ contact: req.body.contact });
        if (data) {
            return res.status(201).json({ message: "Supplier already exists", data });
        } else {
            const supplier = await Supplier.create(req.body);
            return res.status(201).json({ message: "Supplier account created successfully", supplier });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating supplier" });
    }
};

// Remove Supplier API
export const removeSupplier = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(id);
    try {
        const supplier = await Supplier.findOneAndDelete({ _id: id  });
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        return res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting supplier" });
    }
};

// Find Supplier by email (if it was meant to be `Supplier` and not `User`)
// export const findByEmail = async (req: Request<{}, {}, FindByEmailRequestBody>, res: Response, next: NextFunction) => {
//     try {
//         const { email } = req.body;
//         // Ensure that `email` is a field in your schema
//         const supplier = await Supplier.findOne({ email });

//         if (!supplier) {
//             return res.status(404).json({ message: "Supplier not found" });
//         }

//         return res.status(200).json({ supplier });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Something went wrong", error: err });
//     }
// };

// Update Supplier details
export const updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
    const { name, contact, productCategory, userId } = req.body;
    try {
        const supplier = await Supplier.findByIdAndUpdate(userId as ObjectId, { name, contact, productCategory }, { new: true });
        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }
        return res.status(200).json({ supplier });
    } catch (error) {
        console.error('Error updating supplier:', error);
        return res.status(500).json({ error: 'An error occurred while updating the supplier' });
    }
};

// View All Suppliers
export const ViewAllSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const suppliers = await Supplier.find();
        return res.status(200).json({ message: "All Suppliers", suppliers });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
