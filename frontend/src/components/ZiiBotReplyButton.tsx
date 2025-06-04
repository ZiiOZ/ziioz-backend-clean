import { useState } from 'react';

export default function ZiiBotReplyButton({
  comment,
  onReply,
}: {
  comment: string;
  onReply: (reply: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ziibot-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });
      const data = await res.json();
      onReply(data.reply);
    } catch (err) {
      console.error('Bot reply failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReply}
      disabled={loading}
      className="text-sm text-indigo-600 hover:underline mt-2"
    >
      {loading ? 'ZiiBot replying...' : 'Ask ZiiBot to respond'}
    </button>
  );
}
