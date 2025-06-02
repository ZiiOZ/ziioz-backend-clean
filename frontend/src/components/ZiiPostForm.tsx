// src/components/ZiiPostForm.tsx
import { useState } from 'react';
import { useEnhancePost } from '@/hooks/useEnhancePost';

export default function ZiiPostForm() {
  const [content, setContent] = useState('');
  const { hook, hashtags, loading, error, enhance } = useEnhancePost();

  const handleEnhance = () => {
    if (content.trim().length > 10) enhance(content);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to backend
    console.log('Submitting post:', content);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-sm bg-white">
      <textarea
        className="w-full border p-2 rounded resize-none"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleEnhance}
        placeholder="What's on your mind?"
      />

      {loading && <p className="text-sm text-gray-400">Enhancing...</p>}
      {hook && <p className="text-sm font-medium text-blue-600">✨ {hook}</p>}
      {hashtags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-1 text-xs text-gray-500">
          {hashtags.map((tag, idx) => (
            <span key={idx}>#{tag}</span>
          ))}
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Post
      </button>
    </form>
  );
}
