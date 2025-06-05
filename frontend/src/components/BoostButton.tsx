import { useState } from 'react';

export default function BoostButton({ commentId }: { commentId: string }) {
  const [status, setStatus] = useState('');

  const handleBoost = async () => {
    const key = 'ziioz_boost_count';
    const currentCount = parseInt(localStorage.getItem(key) || '0');

    if (currentCount >= 3) {
      setStatus('🔒 Join ZiiOZ to boost more!');
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/boost-comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId, userSession: localStorage.getItem('ziioz_session_id') || 'anon' }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem(key, String(currentCount + 1));
      setStatus('✨ Boosted!');
    } else {
      setStatus(data.error || '❌ Error');
    }
  };

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={handleBoost}
        className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
      >
        Boost
      </button>
      {status && <span className="text-xs mt-1 text-gray-600">{status}</span>}
    </div>
  );
}
