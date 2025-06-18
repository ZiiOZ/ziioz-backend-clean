import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

router.post('/ziibot-reply', async (req: Request, res: Response) => {
  const { comment } = req.body;
  if (!comment) return res.status(400).json({ error: 'Comment is required' });

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `Reply to this: ${comment}` }],
    });

    const reply = result.choices[0]?.message?.content || '';
    res.json({ reply });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'OpenAI error' });
  }
});

export default router;
