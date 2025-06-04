import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiPostEnhance from './api/ai-post-enhance';
import ziiBotReply from './api/ziibot-reply';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use(aiPostEnhance);
app.use(ziiBotReply);

// Health check
app.get('/', (req, res) => {
  res.send('ZiiOZ Backend is Live');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
