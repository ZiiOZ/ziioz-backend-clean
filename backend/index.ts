import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

import aiPostEnhance from './api/ai-post-enhance';
import spinPost from './api/spin-post';
import ziibotReply from './api/ziibot-reply'; // ✅ Must be named and exist

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Supabase Admin Client
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use(aiPostEnhance);
app.use(spinPost);
app.use(ziibotReply);

// ✅ Boost Endpoint (temporary placement)
app.post('/api/boost-comment', async (req, res) => {
  const { commentId, userSession } = req.body;
  if (!commentId || !userSession) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const { data: existing } = await supabase
    .from('comment_boosts')
    .select('id')
    .eq('comment_id', commentId)
    .eq('user_session', userSession);

  if (existing?.length > 0) {

    return res.status(403).json({ error: 'Already boosted' });
  }

  await supabase
    .from('comment_boosts')
    .insert([{ comment_id: commentId, user_session: userSession }]);

  await supabase.rpc('increment_comment_boosts', { comment_id_input: commentId });

  return res.json({ success: true });
});

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('ZiiOZ Backend is LIVE ✅');
});

app.listen(PORT, () => {
  console.log(`ZiiOZ backend running at http://localhost:${PORT}`);
});
