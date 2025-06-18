import { Router, Request, Response } from 'express';

const router = Router();

router.get('/comments', async (req: Request, res: Response) => {
  res.json({ message: 'ZiiOZ comments working!' });
});

router.post('/comments', async (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });

  res.json({ posted: true, content });
});

export default router;
