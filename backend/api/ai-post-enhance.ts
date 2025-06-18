import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

router.post('/ai-enhance', async (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content }],
    });

    const enhanced = result.choices[0]?.message?.content ?? '';
    res.json({ enhanced });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
