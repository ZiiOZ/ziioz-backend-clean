import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ZiiPostForm() {
  const [content, setContent] = useState('');
  const [hook, setHook] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai-post-enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const json = await res.json();
      setHook(json.hook || '');
      setHashtags(json.hashtags || []);
    } catch (err) {
      console.error('AI Enhance Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('posts')
      .upload(fileName, imageFile);

    if (error) {
      console.error('Image upload error:', error);
      return null;
    }

    const url = supabase.storage.from('posts').getPublicUrl(fileName).data.publicUrl;
    setImageUrl(url);
    return url;
  };

  const handleSubmit = async () => {
    if (!content) return;

    setLoading(true);
    const uploadedImageUrl = await handleImageUpload();

    const { error } = await supabase.from('posts').insert([
      {
        content,
        hook,
        hashtags,
        image_url: uploadedImageUrl,
        visible: true,
      },
    ]);

    if (error) console.error('Post submission error:', error);
    else {
      setContent('');
      setHook('');
      setHashtags([]);
      setImageFile(null);
      setImageUrl(null);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4 mt-6">
      <textarea
        className="w-full border rounded p-3"
        rows={4}
        placeholder="Write your post here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="w-full border rounded p-2"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleEnhance}
        disabled={loading}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        {loading ? 'Enhancing...' : 'Generate Caption + Hashtags'}
      </button>

      {hook && (
        <div className="text-sm text-gray-700">
          <span className="font-semibold">Hook:</span> {hook}
        </div>
      )}
      {hashtags.length > 0 && (
        <div className="text-sm text-gray-700">
          <span className="font-semibold">Hashtags:</span>{' '}
          {hashtags.map((tag) => `#${tag}`).join(' ')}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
}
