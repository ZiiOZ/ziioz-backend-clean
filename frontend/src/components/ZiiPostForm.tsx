import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ZiiPostForm() {
  const [content, setContent] = useState('');
  const [hook, setHook] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://ziioz-backend-platform.onrender.com/api/ai-post-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setHook(data.hook || '');
      setHashtags(data.hashtags || []);
    } catch (err) {
      console.error('AI Enhance error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!content) return;

    const { error } = await supabase.from('posts').insert([
      {
        content,
        hook,
        hashtags: hashtags.join(', '),
      },
    ]);
    if (error) console.error('Post submit error:', error);
    else {
      setContent('');
      setHook('');
      setHashtags([]);
      alert('Post submitted!');
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full border p-2"
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleEnhance}
        disabled={loading || !content.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? 'Enhancing...' : 'Enhance with ZiiBot'}
      </button>

      {hook && (
        <div className="bg-gray-100 p-3 rounded">
          <p><strong>Hook:</strong> {hook}</p>
          <p><strong>Hashtags:</strong> {hashtags.map(h => `#${h}`).join(' ')}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!hook}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Submit Post
      </button>
    </div>
  );
}
