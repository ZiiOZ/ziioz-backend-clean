import express from 'express';
import cors from 'cors';
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

// Direct POST handlers
app.post('/api/spin-post', spinPost);
app.post('/api/ziibot-reply', ziiBotReply);

// Root health check
app.get('/', (_, res) => res.send('ZiiOZ Backend Live'));

// Export standard Express app for Vercel
export default app;
