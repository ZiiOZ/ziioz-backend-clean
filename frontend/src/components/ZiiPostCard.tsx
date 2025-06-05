import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface ZiiPostCardProps {
  post: {
    id: string;
    content: string;
    created_at: string;
    image_url: string | null;
    username: string;
  };
}

export default function ZiiPostCard({ post }: ZiiPostCardProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const date = new Date(post.created_at);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (diff < 60) setTimeAgo(`${diff}s ago`);
    else if (minutes < 60) setTimeAgo(`${minutes}m ago`);
    else if (hours < 24) setTimeAgo(`${hours}h ago`);
    else setTimeAgo(`${days}d ago`);
  }, [post.created_at]);

  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-4 max-w-xl w-full mx-auto">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-9 h-9 rounded-full bg-gray-300" />
        <div>
          <p className="text-sm font-semibold">{post.username || 'Unknown User'}</p>
          <p className="text-xs text-gray-500">{timeAgo}</p>
        </div>
      </div>

      <p className="text-base text-gray-800 mb-3">{post.content}</p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="rounded-xl mb-3 max-h-[300px] object-cover w-full"
        />
      )}

      <div className="flex items-center space-x-4 mt-2">
        <a
          href={`/comments/${post.id}`}
          className="text-blue-500 text-sm hover:underline"
        >
          💬 Comment
        </a>
        <a
          href={`/boost/${post.id}`}
          className="text-pink-500 text-sm hover:underline"
        >
          🚀 Boost
        </a>
      </div>
    </div>
  );
}
