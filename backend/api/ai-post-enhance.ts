import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function aiPostEnhance(req: Request, res: Response) {
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
    return res.json({ enhanced: aiText });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'OpenAI error' });
  }
}
