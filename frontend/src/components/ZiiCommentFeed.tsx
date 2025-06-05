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
    <div className="max-w-2xl mx-auto mt-6 space-y-6">
      <h2 className="text-xl font-bold">🧠 ZiiPosts</h2>

      {posts.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg p-4 shadow-sm bg-white space-y-2 relative"
        >
          {/* Admin visibility toggle */}
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
              className="text-xs text-indigo-500 underline absolute
