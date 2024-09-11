import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface defining the properties of the User document
interface IUser extends Document {
    username: string;
    password: string;
    email: string;
}

// Interface for static methods of the User model
interface IUserModel extends Model<IUser> {
    checkPassword(password: string, hashedPassword: string): boolean;
}

// Define the schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        trim: true,
        unique:false
    },
    password: {
        type: String,
        trim: true,
        set: function (password: string) {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        },
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
    },
}, { versionKey: false });

// Static method to compare passwords
userSchema.statics.checkPassword = function (password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
};

// Create the model
const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
