import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface Post {
  id: number;
  content: string;
  hook: string;
  hashtags: string;
  image_url: string | null;
  created_at: string;
  username: string;
  boosts: number;
}

export default function ZiiPostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Fetch posts error:', error);
    else setPosts(data);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold">🧠 ZiiPosts</h2>

      {posts.map((post) => (
        <div key={post.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
          {post.hook && <p className="text-lg font-semibold text-blue-800 mb-2">{post.hook}</p>}
          <p className="mb-2">{post.content}</p>

          {post.hashtags && (
            <p className="text-sm text-gray-600">
              {post.hashtags
                .split(',')
                .map((tag) => `#${tag.trim()}`)
                .join(' ')}
            </p>
          )}

          {post.image_url && (
            <img
              src={post.image_url}
              alt="Post visual"
              className="mt-2 w-full rounded-md object-cover"
            />
          )}

          <p className="text-xs text-gray-400 mt-2">by {post.username || 'Anon'} • {new Date(post.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
