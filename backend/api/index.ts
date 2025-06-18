import express, { Request, Response } from 'express';
import cors from 'cors';
import commentsApi from './comments.api';
import aiPostEnhance from './ai-post-enhance';
import serverless from 'serverless-http'; // ✅ required for Vercel compatibility

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', commentsApi);
app.use('/api', aiPostEnhance);

app.get('/', (_: Request, res: Response) => {
  res.send('ZiiOZ Backend Live');
});

// ✅ Wrap Express app using serverless-http for Vercel
export const handler = serverless(app);
