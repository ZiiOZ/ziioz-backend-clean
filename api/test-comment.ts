import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log("🔍 DEBUG: SUPABASE_URL =", supabaseUrl);
console.log("🔍 DEBUG: SUPABASE_KEY set =", !!supabaseKey);

const supabase = createClient(supabaseUrl!, supabaseKey!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { post_id, comment } = req.body;

  console.log("➡️ Incoming POST:", { post_id, comment });

  if (!post_id || !comment) {
    return res.status(400).json({ error: 'Missing post_id or comment' });
  }

  try {
    const { error } = await supabase
      .from('comments')
      .insert([{ post_id, content: comment }]); // 👈 double check if your column is 'comment' or 'content'

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Comment saved successfully' });
  } catch (err: any) {
    console.error("🔥 Unhandled Exception:", err);
    return res.status(500).json({ error: 'Unhandled server error', details: err.message });
  }
}
