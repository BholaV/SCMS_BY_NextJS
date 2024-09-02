import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface defining the properties of the Supplier document
interface ISupplier extends Document {
    name: string;
    contact: string;
    productCategory: string;
}

// Define the schema with TypeScript types
const SupplierSchema = new Schema<ISupplier>({
    name: {
        type: String,
        trim: true,
    },
    contact: {
        type: String,
        trim: true,
        unique: true,
    },
    productCategory: {
        type: String,
        trim: true,
    },
}, { versionKey: false });

// Create the model
const Supplier: Model<ISupplier> = mongoose.model<ISupplier>('Supplier', SupplierSchema);

export default Supplier;
