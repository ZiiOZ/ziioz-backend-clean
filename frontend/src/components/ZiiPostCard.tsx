import { useState } from 'react';
import { supabase } from '../supabaseClient';

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

export default function ZiiPostCard({
  post,
  onRefresh,
}: {
  post: Post;
  onRefresh: () => void;
}) {
  const [visible, setVisible] = useState(post.visible);
  const [boosts, setBoosts] = useState(post.boosts);

  const handleToggleVisibility = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ visible: !visible })
      .eq('id', post.id);
    if (!error) {
      setVisible(!visible);
      onRefresh();
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('posts').delete().eq('id', post.id);
    if (!error) {
      onRefresh();
    }
  };

  const boostPost = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ boosts: boosts + 1 })
      .eq('id', post.id);
    if (!error) setBoosts(boosts + 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="text-xs text-gray-500">
        {new Date(post.created_at).toLocaleString()}
      </div>
      <div className="text-sm font-medium text-gray-800 mb-1">
        @{post.username || 'anonymous'}
      </div>
      {post.hook && (
        <div className="text-lg font-semibold text-black mb-1">{post.hook}</div>
      )}
      <p className="text-gray-700 mb-2 whitespace-pre-wrap">{post.content}</p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post media"
          className="rounded-lg w-full h-auto object-cover mb-3"
        />
      )}

      {post.hashtags && (
        <div className="text-xs text-blue-500 mb-2">
          {post.hashtags.split(',').map((tag, i) => (
            <span key={i} className="mr-2">#{tag.trim()}</span>
          ))}
        </div>
      )}

      {localStorage.getItem('ziioz_admin') === 'true' && (
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleToggleVisibility}
            className="text-sm text-blue-600 hover:underline"
          >
            {visible ? 'Hide' : 'Show'}
          </button>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <button
          onClick={boostPost}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-xs"
        >
          Boost ({boosts})
        </button>

        <span
          className={`px-4 py-1 rounded-full text-xs ${
            visible
              ? 'bg-green-500 text-white'
              : 'bg-gray-400 text-white'
          }`}
        >
          {visible ? 'Visible' : 'Hidden'}
        </span>
      </div>
    </div>
  );
}
