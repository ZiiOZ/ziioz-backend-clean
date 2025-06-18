import { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

router.post('/comments', async (req: Request, res: Response) => {
  const { post_id, content } = req.body;

  if (!post_id || !content) {
    return res.status(400).json({ error: 'post_id and content are required' });
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([{ post_id, content }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

router.get('/comments/:post_id', async (req: Request, res: Response) => {
  const { post_id } = req.params;

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', post_id)
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

export default router;
