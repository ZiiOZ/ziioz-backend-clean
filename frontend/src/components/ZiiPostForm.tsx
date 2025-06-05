// src/components/ZiiPostForm.tsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ZiiPostForm() {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6 w-full max-w-xl mx-auto">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
        <textarea
          className="flex-grow p-2 border rounded-md w-full resize-none"
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <input
        type="file"
        accept="image/*"
        className="mb-2"
        onChange={handleImageChange}
      />

      {imageUrl && (
        <div className="mb-2">
          <img
            src={imageUrl}
            alt="Preview"
            className="rounded-md max-h-64 object-cover"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Enhance with ZiiBot
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
          Spin Again
        </button>
        <button className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded">
          Submit Post
        </button>
      </div>
    </div>
  );
}
