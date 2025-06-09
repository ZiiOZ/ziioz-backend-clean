import React from 'react';

interface PostCardProps {
  post: {
    id: string;
    content: string;
    imageUrl?: string;
    visible: boolean;
  };
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

export default function PostCard({ post, onDelete, onToggleVisibility }: PostCardProps) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-gray-800">
          {post.visible ? '📢 Public Post' : '🔒 Hidden Post'}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleVisibility(post.id)}
            className="px-2 py-1 text-xs bg-yellow-400 text-black rounded hover:bg-yellow-500"
          >
            {post.visible ? 'Hide' : 'Unhide'}
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-2">{post.content}</p>

      {post.imageUrl && post.visible && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full max-h-64 object-cover rounded"
        />
      )}
    </div>
  );
}
