import express from 'express';
import cors from 'cors';
import { VercelRequest, VercelResponse } from '@vercel/node';

import commentsApi from './comments.api';
import aiPostEnhance from './ai-post-enhance';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Only use routers here
app.use('/api', commentsApi);
app.use('/api', aiPostEnhance);

app.get('/', (_, res) => res.send('ZiiOZ Backend Live'));

export const handler = (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any);
};
