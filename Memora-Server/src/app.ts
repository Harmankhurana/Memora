import express from 'express';
import type { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('api/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'Ok',
    });
});

app.use('api/auth', authRoutes);

export default app;
