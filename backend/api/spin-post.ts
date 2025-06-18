import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function spinPost(req: Request, res: Response) {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Missing content' });

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Rephrase and creatively spin this post:' },
        { role: 'user', content },
      ],
    });

    const spun = result.choices[0]?.message?.content || '';
    res.json({ spun });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'OpenAI error' });
  }
}
