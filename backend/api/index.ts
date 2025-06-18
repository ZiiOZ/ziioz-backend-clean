import express from 'express';
import cors from 'cors';
import commentsApi from './comments.api';
import aiPostEnhance from './ai-post-enhance';
import { VercelRequest, VercelResponse } from '@vercel/node'; // ✅ move this up

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', commentsApi);
app.use('/api', aiPostEnhance);

app.get('/', (_, res) => res.send('ZiiOZ Backend Live'));

// ✅ Vercel-specific handler export
export const handler = (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any);
};
