import { useState } from 'react';

export default function ZiiPostForm() {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [hook, setHook] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setHook('');
    setHashtags([]);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai-post-enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setHook(data.hook || '');
      setHashtags(data.hashtags || []);
    } catch (err) {
      console.error('AI generation failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = () => {
    alert('✅ Post submitted!');
    setContent('');
    setImageUrl('');
    setHook('');
    setHashtags([]);
    setShowPreview(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create a Post</h2>

      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
        className="w-full p-2 border rounded mb-3"
      />

      <div className="flex gap-2 flex-wrap mb-3">
        <button
          onClick={() => setShowPreview(true)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Preview
        </button>
        <button
          onClick={handleGenerate}
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          {loading ? 'Thinking...' : 'Generate Caption'}
        </button>
        <button
          onClick={handlePost}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      {hook && (
        <div className="mb-2 text-sm text-green-700">
          <strong>AI Hook:</strong> {hook}
        </div>
      )}

      {hashtags.length > 0 && (
        <div className="mb-4 text-sm text-blue-700">
          <strong>Hashtags:</strong>{' '}
          {hashtags.map((tag) => (
            <span key={tag} className="mr-2">#{tag}</span>
          ))}
        </div>
      )}

      {showPreview && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">🔍 Preview</h3>
          <p className="text-gray-700 mb-2">{content || '📝 Your post text will appear here.'}</p>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded"
            />
          )}
        </div>
      )}
    </div>
  );
}
