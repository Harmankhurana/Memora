import express from 'express';
import type { Request, Response } from 'express';
import authRouter from './routes/auth.route.js';

const app = express();
app.use(express.json());

app.get('api/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'Ok',
    });
});

app.use('api/auth', authRouter);

export default app;
