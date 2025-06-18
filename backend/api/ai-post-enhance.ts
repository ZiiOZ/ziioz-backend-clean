import { Router, Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';

const router = Router();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

router.post('/ai-post-enhance', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert social media enhancer.' },
        { role: 'user', content: `Make this post more engaging:\n\n${content}` },
      ],
    });

    const enhanced = response.data.choices[0]?.message?.content;
    res.status(200).json({ enhanced });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
