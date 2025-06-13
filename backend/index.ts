import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// ✅ Load environment variables
dotenv.config();

// ✅ Express app
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

// ✅ ZiiOZ AI Routes
import aiPostEnhance from './api/ai-post-enhance';
import spinPost from './api/spin-post';
import ziibotReply from './api/ziibot-reply';

app.use(aiPostEnhance);
app.use(spinPost);
app.use(ziibotReply);

// ✅ Boost Endpoint
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

  if ((existing || []).length > 0) {
    return res.status(403).json({ error: 'Already boosted' });
  }

  await supabase
    .from('comment_boosts')
    .insert([{ comment_id: commentId, user_session: userSession }]);

  await supabase.rpc('increment_comment_boosts', { comment_id_input: commentId });

  return res.json({ success: true });
});

// ✅ NEW: Flag User Endpoint for Law Enforcement System
app.post('/api/flag-user', async (req, res) => {
  const { user_id, flagged_by, reason, ai_score, evidence } = req.body;

  const { error } = await supabase.from('flagged_cases').insert([
    {
      user_id,
      flagged_by,
      reason,
      ai_score,
      case_status: 'pending',
      evidence,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'User flagged successfully.' });
});

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('ZiiOZ Backend is LIVE ✅');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`ZiiOZ backend running at http://localhost:${PORT}`);
});
