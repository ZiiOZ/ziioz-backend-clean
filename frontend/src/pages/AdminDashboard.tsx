import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [topPost, setTopPost] = useState<any>(null);

  useEffect(() => {
    if (localStorage.getItem('ziioz_admin') !== 'true') return;

    const fetchStats = async () => {
      const { count: posts } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true });

      const { count: comments } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true });

      const { data: top } = await supabase
        .from('posts')
        .select('*')
        .order('boosts', { ascending: false })
        .limit(1)
        .single();

      setPostCount(posts || 0);
      setCommentCount(comments || 0);
      setTopPost(top);
    };

    fetchStats();
  }, []);

  if (localStorage.getItem('ziioz_admin') !== 'true') {
    return <div className="p-6 text-center text-gray-500">Not authorized</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 space-y-6">
      <h2 className="text-2xl font-bold">🛠️ Admin Dashboard</h2>

      <div className="bg-gray-50 p-4 rounded shadow-sm border space-y-1">
        <p className="text-lg">📊 Total Posts: <strong>{postCount}</strong></p>
        <p className="text-lg">💬 Total Comments: <strong>{commentCount}</strong></p>
      </div>

      {topPost && (
        <div className="bg-white p-4 border rounded shadow-sm space-y-2">
          <p className="text-sm text-gray-500">🚀 Top Boosted Post:</p>
          <p className="text-indigo-600 font-semibold">{topPost.hook}</p>
          <p>{topPost.content}</p>
          <p className="text-sm text-gray-500">Boosts: {topPost.boosts}</p>
        </div>
      )}
    </div>
  );
}
