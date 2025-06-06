import express from 'express';
import OpenAI from 'openai';
import { supabase } from '../supabaseServerClient';

const router = express.Router();

router.post('/api/ziibot-reply', async (req, res) => {
  // ... your logic ...
});

export default router;
