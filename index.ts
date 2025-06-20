import express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();

app.get('/', (req, res) => {
  res.send('ZiiOZ backend root ✅');
});

// Export for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};
