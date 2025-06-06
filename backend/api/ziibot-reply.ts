import express from 'express';
import OpenAI from 'openai';
import { supabase } from '../supabaseServerClient';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

router.post('/api/ziibot-reply', async (req, res) => {
  const { comment, commentId } = req.body;

  if (!comment || !commentId) {
    return res.status(400).json({ error: 'Missing comment or commentId' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are ZiiBot, a sharp, helpful, and cheeky assistant.',
        },
        {
          role: 'user',
          content: comment,
        },
      ],
    });

    const reply = response.choices?.[0]?.message?.content?.trim();

    const { error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: commentId,
          username: 'ZiiBot',
          content: reply,
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to store reply' });
    }

    res.json({ reply });
  } catch (err) {
    console.error('[ZiiBot Reply Error]', err);
    res.status(500).json({ error: 'AI failed to generate reply' });
  }
});

export default router; // ✅ fix 2: export default router
