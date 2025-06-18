// backend/api/ai-post-enhance.ts
import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/ai-post-enhance', async (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content }],
    });

    const aiText = result.choices[0]?.message?.content || '';
    return res.status(200).json({ enhanced: aiText });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'OpenAI Error' });
  }
});

export default router;
