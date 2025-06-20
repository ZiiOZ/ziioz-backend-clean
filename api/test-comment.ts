// /api/test-comment.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { post_id, comment } = req.body;

  if (!post_id || !comment) {
    return res.status(400).json({ error: 'Missing post_id or comment' });
  }

  const { error } = await supabase
    .from('comments')
    .insert([{ post_id, content: comment }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ success: true });
}
