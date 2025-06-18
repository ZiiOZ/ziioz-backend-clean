import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'ZiiOZ Backend is Live 🚀' });
});

// You can add more routes here
// app.post('/api/comments', ...);

export default app;
