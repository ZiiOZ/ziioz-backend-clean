import { Router, Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';

const router = Router();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

router.post('/spin-post', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a witty social media content spinner.' },
        { role: 'user', content: `Spin this post into a creative, engaging version:\n\n${content}` },
      ],
    });

    const spin = response.data.choices[0]?.message?.content;
    res.status(200).json({ spin });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
