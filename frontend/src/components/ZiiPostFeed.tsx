import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface Post {
  id: number;
  content: string;
  hook?: string;
  hashtags?: string;
  image_url?: string;
  username?: string;
  created_at: string;
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

    if (error) {
      console.error('Error loading posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-6">
      <h2 className="text-xl font-bold">🧠 ZiiPosts</h2>

      {posts.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg p-4 shadow-sm bg-white space-y-2"
        >
          {post.hook && (
            <p className="text-indigo-600 font-semibold text-md">{post.hook}</p>
          )}

          <p className="text-gray-800">{post.content}</p>

          {post.image_url && (
            <img
              src={post.image_url}
              alt="Uploaded"
              className="w-full max-h-64 object-cover rounded"
            />
          )}

          {post.hashtags && (
            <p className="text-sm text-blue-500">
              {post.hashtags.split(',').map((tag, i) => (
                <span key={i}>#{tag.trim()} </span>
              ))}
            </p>
          )}

          <p className="text-xs text-gray-500">
            by {post.username || 'anonymous'} •{' '}
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
