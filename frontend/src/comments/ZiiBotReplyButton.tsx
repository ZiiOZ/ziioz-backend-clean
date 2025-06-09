import { useState } from 'react';

export default function ZiiBotReplyButton({ comment }: { comment: string }) {
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState('');

  const handleReply = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });

      const data = await res.json();
      setReply(data.reply || '🤖 No reply generated.');
    } catch (err) {
      console.error('AI reply error', err);
      setReply('⚠️ Failed to generate reply.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleReply}
        disabled={loading}
        className="text-xs text-purple-500 hover:underline"
      >
        {loading ? 'ZiiBot is typing...' : 'Ask ZiiBot 🤖'}
      </button>
      {reply && (
        <div className="mt-1 text-gray-700 text-sm bg-purple-50 border-l-4 border-purple-300 pl-2 py-1 rounded">
          {reply}
        </div>
      )}
    </div>
  );
}
