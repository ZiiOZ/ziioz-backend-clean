import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ZiiPostForm() {
  const [content, setContent] = useState('');
  const [hook, setHook] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [spins, setSpins] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleEnhance = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai-post-enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setHook(data.hook || '');
      setHashtags(data.hashtags || []);
      console.log('✅ Enhance result:', data);
    } catch (err) {
      console.error('❌ AI Enhance error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/spin-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setSpins(data.spins || []);
      console.log('✅ Spin result:', data);
    } catch (err) {
      console.error('❌ Spin error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const filePath = `post-${Date.now()}-${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from('post-images')
      .upload(filePath, imageFile, { cacheControl: '3600', upsert: false });

    if (error) {
      console.error('❌ Upload error:', error);
      return null;
    }

    const { data: publicUrl } = supabase.storage.from('post-images').getPublicUrl(filePath);
    return publicUrl.publicUrl;
  };

  const handleSubmit = async () => {
    console.log('🚀 Submitting...');
    setLoading(true);

    try {
      const uploadedImageUrl = await handleImageUpload();

      const payload = {
        content,
        hook,
        hashtags: hashtags.join(', '),
        image_url: uploadedImageUrl || null,
        username: 'ZiiUser',
      };

      console.log('📦 Insert payload:', payload);

      const { error } = await supabase.from('posts').insert([payload]);

      if (error) {
        console.error('❌ Supabase insert error:', error.message);
      } else {
        alert('Post submitted!');
        setContent('');
        setHook('');
        setHashtags([]);
        setSpins([]);
        setImageFile(null);
        setImageUrl(null);
      }
    } catch (e) {
      console.error('💥 Unexpected error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <textarea
        className="w-full border p-2"
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <div className="flex gap-3">
        <button
          onClick={handleEnhance}
          disabled={loading || !content.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? 'Enhancing...' : 'Enhance with ZiiBot'}
        </button>

        <button
          onClick={handleSpin}
          disabled={loading || !content.trim()}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          {loading ? 'Spinning...' : 'Spin Again'}
        </button>
      </div>

      {spins.length > 0 && (
        <div className="bg-yellow-50 p-3 rounded space-y-2">
          <p className="font-semibold text-yellow-700">Choose a spin version:</p>
          {spins.map((spin, i) => (
            <button
              key={i}
              onClick={() => setContent(spin)}
              className="block text-left p-2 border rounded hover:bg-yellow-100 w-full"
            >
              {spin}
            </button>
          ))}
        </div>
      )}

      {hook && (
        <div className="bg-gray-100 p-3 rounded">
          <p><strong>Hook:</strong> {hook}</p>
          <p><strong>Hashtags:</strong> {hashtags.map(h => `#${h}`).join(' ')}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!content.trim() || loading}
        className="px-4 py-2 bg-black text-white rounded"
      >
        {loading ? 'Submitting...' : 'Submit Post'}
      </button>
    </div>
  );
}
