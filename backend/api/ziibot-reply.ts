import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

router.post('/api/ziibot-reply', async (req, res) => {
  const { comment } = req.body;
  if (!comment) return res.status(400).json({ error: 'Missing comment' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Reply to this comment: "${comment}"` }],
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    res.json({ reply });
  } catch (err) {
    console.error('ZiiBot reply error:', err);
    res.status(500).json({ error: 'Failed to generate reply' });
  }
});

export default router;
