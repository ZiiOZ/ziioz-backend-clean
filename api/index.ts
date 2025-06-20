import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ZiiOZ backend is live ✅' });
});

// Vercel requires export of a handler
export default app;
