// ✅ Middleware setup
app.use(cors());
app.use(express.json());

// ✅ Your other routes
import aiPostEnhance from './api/ai-post-enhance';
import spinPost from './api/spin-post';
import ziibotReply from './api/ziibot-reply';

app.use(aiPostEnhance);
app.use(spinPost);
app.use(ziibotReply);

// ✅ BOOST endpoint
app.post('/api/boost-comment', async (req, res) => {
  // ...
});

// ✅ 🔥 STEP 1 — INSERT HERE
app.post('/api/flag-user', async (req, res) => {
  console.log('🔥 /api/flag-user hit'); // <-- helpful debug log

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

// ✅ Health check (can stay below)
app.get('/', (req, res) => {
  res.send('ZiiOZ Backend is LIVE ✅');
});

// ✅ Start Express Server
app.listen(PORT, () => {
  console.log(`ZiiOZ backend running at http://localhost:${PORT}`);
});
