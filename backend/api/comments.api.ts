import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { post_id, content } = req.body;

    if (!post_id || !content) {
      return res.status(400).json({ error: 'post_id and content are required' });
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id, content }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'GET') {
    const post_id = req.query.post_id as string;

    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post_id)
      .order('created_at', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
