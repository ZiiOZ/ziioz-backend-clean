import { useState } from 'react';

export default function ZiiBotReplyButton({
  comment,
  commentId,
  onReply,
}: {
  comment: string;
  commentId: string;
  onReply: (reply: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ziibot-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, commentId }),
      });

      const data = await res.json();
      if (data.reply) {
        onReply(data.reply);
      } else {
        alert('No reply generated');
      }
    } catch (err) {
      console.error('ZiiBot error:', err);
      alert('Failed to get reply');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-xs text-purple-600 hover:underline mt-2"
    >
      {loading ? 'ZiiBot is thinking...' : 'Ask ZiiBot 🤖'}
    </button>
  );
}
