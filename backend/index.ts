import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import aiPostEnhance from './api/ai-post-enhance';
import ziiBotReply from './api/ziibot-reply';
import spinPost from './api/spin-post'; // ✅ only once

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(spinPost);       // ✅ once here
app.use(aiPostEnhance);
app.use(ziiBotReply);

app.get('/', (req, res) => {
  res.send('ZiiOZ Backend is Live');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
