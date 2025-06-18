import { Router, Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';

const router = Router();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

router.post('/ziibot-reply', async (req: Request, res: Response) => {
  try {
    const { comment } = req.body;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are ZiiBot, an insightful and friendly assistant who replies to social media comments with wit, kindness, or sass.' },
        { role: 'user', content: `Reply to this comment:\n\n"${comment}"` },
      ],
    });

    const reply = response.data.choices[0]?.message?.content;
    res.status(200).json({ reply });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
