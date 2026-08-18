import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT ?? 5000;

async function ServerStarted () {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on "http://localhost:${PORT}"`);
        }) 
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
;
}

ServerStarted();