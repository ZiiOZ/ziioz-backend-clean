import spinPost from './api/spin-post';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiPostEnhance from './api/ai-post-enhance';
import ziiBotReply from './api/ziibot-reply';

dotenv.config();

const app = express(); // ✅ Declare first
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(spinPost);

// API Routes
app.use(aiPostEnhance);
app.use(ziiBotReply);
app.use(spinPost);

// Health Check
app.get('/', (req, res) => {
  res.send('ZiiOZ Backend is Live');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
