import express from 'express';
import cors from 'cors';
import { VercelRequest, VercelResponse } from '@vercel/node';

import commentsApi from './comments.api';
import aiPostEnhance from './ai-post-enhance';
import spinPost from './spin-post';
import ziiBotReply from './ziibot-reply';

const app = express();
app.use(cors());
app.use(express.json());

// Routers
app.use('/api', commentsApi);
app.use('/api', aiPostEnhance);

// Individual POST handlers
app.post('/api/spin-post', spinPost);
app.post('/api/ziibot-reply', ziiBotReply);

// Health check
app.get('/', (_, res) => res.send('ZiiOZ Backend Live'));

// Vercel export
export const handler = (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any);
};
