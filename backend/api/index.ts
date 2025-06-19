// api/index.ts
import express, { Request, Response } from 'express';
import { createServer } from '@vercel/node';

import commentsApi from './comments.api';
import aiPostEnhance from './ai-post-enhance';
import spinPost from './spin-post';
import ziiBotReply from './ziibot-reply';

const app = express();
app.use(express.json());
app.use('/api/comments', commentsApi);
app.use('/api/ai', aiPostEnhance);
app.use('/api/spin', spinPost);
app.use('/api/ziibot', ziiBotReply);

app.get('/', (_: Request, res: Response) => res.send('ZiiOZ backend running'));

export default createServer(app); // ✅ Vercel-compatible handler
