import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import PostBoostButton from './posts/PostBoostButton';

interface Post {
  id: number;
  content: string;
  hook?: string;
  hashtags?: string;
  image_url?: string;
  username?: string;
  created_at: string;
  boosts: number;
  visible?: boolean;
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
      .eq('visible', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-6 px-4 space-y-6">
      <h2 className="text-xl font-bold">🧠 ZiiPosts</h2>

      {posts.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg p-4 shadow-sm bg-white space-y-2 relative"
        >
          {/* Admin toggle visibility */}
          {localStorage.getItem('ziioz_admin') === 'true' && (
            <button
              onClick={async () => {
                const { data: current } = await supabase
                  .from('posts')
                  .select('visible')
                  .eq('id', post.id)
                  .single();

                const newState = !current?.visible;

                const { error } = await supabase
                  .from('posts')
                  .update({ visible: newState })
                  .eq('id', post.id);

                if (!error) fetchPosts();
              }}
              className="text-xs text-indigo-500 underline absolute top-2 right-2"
            >
              Toggle Visibility
            </button>
          )}

          {post.hook && (
            <p className="text-indigo-600 font-semibold text-md break-words">{post.hook}</p>
          )}

          <p className="text-gray-800 text-sm break-words">{post.content}</p>

          {post.image_url && (
            <img
              src={post.image_url}
              alt="Uploaded"
              className="w-full max-h-64 object-cover rounded"
            />
          )}

          {post.hashtags && (
            <p className="text-sm text-blue-500 flex flex-wrap gap-1">
              {post.hashtags.split(',').map((tag, i) => (
                <span key={i}>#{tag.trim()}</span>
              ))}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <PostBoostButton postId={post.id} />
            <span className="text-sm text-gray-500">{post.boosts} boosts</span>
          </div>

          <p className="text-xs text-gray-500">
            by {post.username || 'anonymous'} •{' '}
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
