import { Request, Response, NextFunction } from 'express';
import User from '../Model/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// User Sign Up
export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(201).json({ message: "User already exists", data: existingUser });
        }

        const user = await User.create(req.body);
        // const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, { expiresIn: '7d' });
        return res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        console.error(err),"=======================";
        return res.status(500).json({ message: "Error creating user" });
    }
};

// User Sign In
export const SignIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        const isPasswordValid = User.checkPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        return res.status(200).json({ message: "User signed in successfully", user });
    } catch (err) {
        // console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Update Password
export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        const isPasswordCorrect = User.checkPassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Password does not match" });
        }
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// Generate Token
export const generateToken = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const payload = { email };
    const token = jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: '7d' });
    console.log(`${email} ${token}`);
    return res.status(200).json({ message: "Token created successfully", token });
}
