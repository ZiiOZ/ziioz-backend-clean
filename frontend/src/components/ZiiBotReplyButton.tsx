import { useState } from 'react';

interface Props {
  comment: string;
  onReply: (reply: string) => void;
}

export default function ZiiBotReplyButton({ comment, onReply }: Props) {
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
      if (data.reply) onReply(data.reply);
    } catch (err) {
      console.error('ZiiBot reply failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReply}
      className="text-sm text-purple-600 hover:underline"
      disabled={loading}
    >
      {loading ? 'ZiiBot typing...' : 'Ask ZiiBot'}
    </button>
  );
}
