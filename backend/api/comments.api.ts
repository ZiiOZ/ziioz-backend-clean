import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

// ✅ Initialize Supabase from environment
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// ✅ Set up Express Router
const router = Router();

// 🔹 GET /api/comments?post_id=abc
router.get('/comments', async (req: Request, res: Response) => {
  const { post_id } = req.query;

  if (!post_id || typeof post_id !== 'string') {
    return res.status(400).json({ error: 'post_id is required' });
  }

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', post_id)
    .order('created_at', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
});

// 🔹 POST /api/comments
router.post('/comments', async (req: Request, res: Response) => {
  const { post_id, author, content } = req.body;

  if (!post_id || !author || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase.from('comments').insert([
    {
      post_id,
      author,
      content,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
});

export default router;
