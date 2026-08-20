import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import z from "zod";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { JWT_PASSWORD } from "../config/jwt.config.js";

const saltRounds = 10;

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signup = async (req: Request, res: Response): Promise<void> => {
    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid input",
            errors: parsedData.error.flatten(),
        });
        return;
    }

    const { name, email, password } = parsedData.data;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                message: "User already exists",
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User signed up successfully",
            userId: user._id,
        });

    } catch (error) {
        console.error("Signup error:", error);

        res.status(500).json({
            message: "Something went wrong while signing up",
        });
    }
};

const signinSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedData = signinSchema.safeParse(req.body);

        if (!parsedData.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: parsedData.error.flatten(),
            });
            return;
        }

        const { email, password } = parsedData.data;

        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            res.status(400).json({
                message: "Incorrect credentials, check email or password",
            });
            return;
        }

        const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!passwordMatch) {
            res.status(400).json({
                message: "Incorrect credentials, check email or password",
            });
            return;
        }

        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD);

        res.status(200).json({
            token,
        });
        
    } catch (error) {
        console.error("Signin error:", error);

        res.status(500).json({
            message: "Something went wrong while signing in",
        });
    }
};