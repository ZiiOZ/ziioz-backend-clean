import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function ziiBotReply(req: Request, res: Response) {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: 'Comment is required' });
  }

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are ZiiBot, a clever and witty AI who responds to social media comments.' },
        { role: 'user', content: comment },
      ],
    });

    const reply = result.choices[0]?.message?.content || '';
    return res.json({ reply });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'ZiiBot error' });
  }
}
