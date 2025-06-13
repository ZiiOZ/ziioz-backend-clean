import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

app.use(cors());
app.use(express.json());

// ✅ Test route
app.get('/', (req: Request, res: Response) => {
  res.send('ZiiOZ Backend is LIVE ✅');
});

// ✅ Boost Endpoint (you can re-add your original logic here)
app.post('/api/boost-comment', async (req: Request, res: Response) => {
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

// ✅ NEW: Flag User Endpoint
app.post('/api/flag-user', async (req: Request, res: Response) => {
  console.log('🔥 /api/flag-user hit');

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
    console.error('❌ Supabase error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'User flagged successfully.' });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`ZiiOZ backend running at http://localhost:${PORT}`);
});
