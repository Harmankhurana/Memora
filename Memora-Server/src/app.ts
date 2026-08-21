import express from 'express';
import type { Request, Response } from 'express';
import authRouter from './routes/auth.route.js';
import contentRouter from './routes/content.route.js';
import shareRouter from './routes/share.route.js';

const app = express();
app.use(express.json());

app.get('api/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'Ok',
    });
});

app.use('api/v1/auth', authRouter);
app.use('api/v1/content', contentRouter);
app.use('api/v1/brain', shareRouter);

export default app;
