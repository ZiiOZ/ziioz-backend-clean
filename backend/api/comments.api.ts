import { Router, Request, Response } from 'express';

const router = Router();

router.get('/comments', async (req: Request, res: Response) => {
  res.json({ message: 'Sample GET' });
});

router.post('/comments', async (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Missing content' });

  res.json({ posted: true });
});

export default router;
