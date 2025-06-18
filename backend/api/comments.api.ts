import { Router, Request, Response } from 'express';

const router = Router();

router.get('/comments', async (req: Request, res: Response) => {
  res.json({ message: 'Get comments endpoint working.' });
});

router.post('/comments', async (req: Request, res: Response) => {
  const { content, postId } = req.body;
  if (!content || !postId) {
    return res.status(400).json({ error: 'Missing content or postId' });
  }

  // Replace with Supabase logic
  res.json({ success: true, content, postId });
});

export default router;
