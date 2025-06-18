import express from 'express';
import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

router.post('/', async (req: Request, res: Response) => {
  const { post_id, comment_text, author } = req.body;

  const { data, error } = await supabase.from('comments').insert([
    { post_id, comment_text, author }
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ data });
});

router.get('/:post_id', async (req: Request, res: Response) => {
  const { post_id } = req.params;

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', post_id)
    .order('created_at', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ comments: data });
});

export default router;
