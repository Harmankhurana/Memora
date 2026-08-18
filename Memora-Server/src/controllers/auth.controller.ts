import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import z from 'zod';

const saltRounds = 10;

export const signup = async (req: Request, res: Response): Promise<void> => {
    const requiredBody = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success) {
        res.status(400).json({
            message: "Incorrect format used",
        });
    }

    const { name, email, password } = parsedDataWithSuccess.data;

    try {
        // checking for the credentials passed or not
        if (!name || !email || !password) {
            res.status(400).json({
                message: 'Name, Email and password are required'
            });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: 'User already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'Your Signed Up',
            userId: user._id,
        });
        
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong while signing up",
            error: e,
        });
    }
}

export const signin = async (req: Request, res: Response): Promise<void> => {

}