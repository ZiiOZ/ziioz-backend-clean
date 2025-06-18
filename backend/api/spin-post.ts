// backend/api/spin-post.ts
import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/spin-post', async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `Spin this creatively:\n\n${text}` }],
    });

    const spunText = result.choices[0]?.message?.content || '';
    return res.status(200).json({ spun: spunText });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'OpenAI Error' });
  }
});

export default router;
