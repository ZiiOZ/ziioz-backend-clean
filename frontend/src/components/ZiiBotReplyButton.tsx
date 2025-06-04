// src/components/comments/ZiiBotReplyButton.tsx
import { useState } from 'react';

interface Props {
  comment: string;
  onReply: (reply: string) => void;
}

export default function ZiiBotReplyButton({ comment, onReply }: Props) {
  const [loading, setLoading] = useState(false);

  const handleGenerateReply = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://ziioz-backend-platform.onrender.com/api/ziibot-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });
      const data = await res.json();
      if (data.reply) onReply(data.reply);
    } catch (err) {
      console.error('ZiiBot reply error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerateReply}
      className="mt-2 px-3 py-1 text-sm rounded bg-gray-800 text-white hover:bg-gray-700"
      disabled={loading}
    >
      {loading ? 'ZiiBot typing...' : 'Reply with ZiiBot'}
    </button>
  );
}
