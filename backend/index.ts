import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

import aiPostEnhance from './api/ai-post-enhance';
import spinPost from './api/spin-post';
import ziiBotReply from './api/ziibot-reply';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Supabase Admin Client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use(aiPostEnhance);
app.use(spinPost);
app.use(ziiBotReply);

// ✅ Health Check
app.get('/', (_, res) => {
  res.send('ZiiOZ Backend is Live');
});

// ✅ Boost Comment Endpoint
app.post('/api/boost-comment', async (req, res) => {
  const { commentId, userSession } = req.body;

  if (!commentId || !userSession) {
    return res.status(400).json({ error: 'Missing commentId or userSession' });
  }

  const { data: existing, error: fetchError } = await supabase
    .from('comment_boosts')
    .select('id')
    .eq('comment_id', commentId)
    .eq('user_session', userSession);

  if (fetchError) return res.status(500).json({ error: 'Boost lookup failed' });
  if (existing.length > 0) return res.status(403).json({ error: 'Already boosted' });

  const { error: insertError } = await supabase
    .from('comment_boosts')
    .insert([{ comment_id: commentId, user_session: userSession }]);

  if (insertError) return res.status(500).json({ error: 'Boost insert failed' });

  const { error: updateError } = await supabase
    .rpc('increment_comment_boosts', { comment_id_input: commentId });

  if (updateError) return res.status(500).json({ error: 'Boost increment failed' });

  res.json({ success: true });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`ZiiOZ Backend running on ${PORT}`);
});
