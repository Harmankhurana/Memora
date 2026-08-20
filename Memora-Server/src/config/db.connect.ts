import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
    const url = process.env.MONGO_URL;

    if(!url) {
        throw new Error('MONGO_URL is not defined in environment variables')
    }

    await mongoose.connect(url);
    console.log('MongoDB Connected with backend server')
}