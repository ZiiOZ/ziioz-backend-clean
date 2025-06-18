import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function spinPost(req: Request, res: Response) {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a creative content spinner. Rewrite posts in 3 unique variations.' },
        { role: 'user', content },
      ],
    });

    const spunText = result.choices[0]?.message?.content || '';
    return res.json({ spun: spunText });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'OpenAI error' });
  }
}
