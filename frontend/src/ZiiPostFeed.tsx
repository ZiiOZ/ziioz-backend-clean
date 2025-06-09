import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import PostCard from './PostCard';

interface Post {
  id: string;
  content: string;
  hook: string;
  hashtags: string[];
  image_url?: string;
  visible: boolean;
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
      .eq('visible', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {posts.length === 0 ? (
        <div className="text-center text-gray-400 text-sm">
          😅 No posts yet... Be the first to post something amazing!
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} refreshPosts={fetchPosts} />
        ))
      )}
    </div>
  );
}
