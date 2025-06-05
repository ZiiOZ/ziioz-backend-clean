import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ZiiPostCard from './ZiiPostCard';

interface Post {
  id: number;
  content: string;
  hook?: string;
  hashtags?: string;
  image_url?: string;
  username?: string;
  created_at: string;
  boosts: number;
  visible: boolean;
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

    if (error) console.error('Error loading posts:', error);
    else setPosts(data);
  };

  return (
    <div className="p-4 space-y-4">
      {posts.length === 0 ? (
        <div className="text-center text-gray-400 text-sm">
          No posts yet — be the first to share something!
        </div>
      ) : (
        posts.map((post) => (
          <ZiiPostCard key={post.id} post={post} onRefresh={fetchPosts} />
        ))
      )}
    </div>
  );
}
