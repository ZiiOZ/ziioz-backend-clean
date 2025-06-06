import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

import aiPostEnhance from './api/ai-post-enhance';
import spinPost from './api/spin-post';
import ziibotReply from './api/ziibot-reply';

dotenv.config(); // ✅ Load .env first

const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use(aiPostEnhance);
app.use(spinPost);
app.use(ziibotReply);

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('ZiiOZ Backend is Live');
});

// ✅ Boost Endpoint
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

  if (fetchError) return res.status(500).json({ error: 'Lookup failed' });
  if (existing.length > 0) return res.status(403).json({ error: 'Already boosted' });

  const { error: insertError } = await supabase
    .from('comment_boosts')
    .insert([{ comment_id: commentId, user_session: userSession }]);

  if (insertError) return res.status(500).json({ error: 'Insert failed' });

  const { error: updateError } = await supabase
    .rpc('increment_comment_boosts', { comment_id_input: commentId });

  if (updateError) return res.status(500).json({ error: 'Increment failed' });

  res.json({ success: true });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`ZiiOZ Backend running on http://localhost:${PORT}`);
});
