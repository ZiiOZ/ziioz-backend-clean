import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

import aiPostEnhance from './api/ai-post-enhance';
import ziiBotReply from './api/ziibot-reply';
import spinPost from './api/spin-post';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Supabase Admin Client (requires service role key)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

app.use(cors());
app.use(express.json());

// ✅ Existing Routes
app.use(spinPost);
app.use(aiPostEnhance);
app.use(ziiBotReply);

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('ZiiOZ Backend is Live');
});

// ✅ Boost Comment Endpoint
app.post('/api/boost-comment', async (req, res) => {
  const { commentId, userSession } = req.body;

  if (!commentId || !userSession) {
    return res.status(400).json({ error: 'Missing commentId or userSession' });
  }

  // 1. Check if already boosted
  const { data: existing, error: fetchError } = await supabase
    .from('comment_boosts')
    .select('id')
    .eq('comment_id', commentId)
    .eq('user_session', userSession);

  if (fetchError) {
    console.error('[Fetch Error]', fetchError);
    return res.status(500).json({ error: 'Boost lookup failed' });
  }

  if (existing.length > 0) {
    return res.status(403).json({ error: 'Already boosted' });
  }

  // 2. Insert boost record
  const { error: insertError } = await supabase
    .from('comment_boosts')
    .insert([{ comment_id: commentId, user_session: userSession }]);

  if (insertError) {
    console.error('[Insert Error]', insertError);
    return res.status(500).json({ error: 'Boost insert failed' });
  }

  // 3. Increment boost count in comments table
  const { error: updateError } = await supabase
    .rpc('increment_comment_boosts', { comment_id_input: commentId });

  if (updateError) {
    console.error('[Boost Update Error]', updateError);
    return res.status(500).json({ error: 'Boost increment failed' });
  }

  return res.json({ success: true });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
