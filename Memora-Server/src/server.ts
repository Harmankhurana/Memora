import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get('/api/health', async(req: Request, res: Response) => {
    res.status(200).json({
        status: "OK",
    });
});

function ServerStarted () {
    await connectDB();
    app.listen(PORT, () => {
    console.log(`Server is running on "http://localhost:${PORT}"`);
    });
}

ServerStarted();