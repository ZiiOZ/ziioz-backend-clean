import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ZiiPostForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log('🟡 handleSubmit clicked');

    setLoading(true);
    const payload = {
      content,
      username: 'ZiiUser',
    };

    console.log('📦 Sending payload:', payload);

    const { data, error } = await supabase.from('posts').insert([payload]);

    if (error) {
      console.error('❌ Supabase insert error:', error.message);
    } else {
      console.log('✅ Insert successful:', data);
      alert('Post submitted!');
      setContent('');
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <textarea
        className="w-full border p-2"
        placeholder="Test Supabase connection"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {loading ? 'Submitting...' : 'Submit Post'}
      </button>
    </div>
  );
}
