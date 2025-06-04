import { useState, useEffect } from 'react';

export default function PostBoostButton({ postId }: { postId: string }) {
  const [boosted, setBoosted] = useState(false);

  useEffect(() => {
    const key = `${postId}_boosted`;
    const session = localStorage.getItem('ziioz_session') || crypto.randomUUID();
    localStorage.setItem('ziioz_session', session);
    setBoosted(localStorage.getItem(key) === 'true');
  }, [postId]);

  const handleBoost = async () => {
    const session = localStorage.getItem('ziioz_session');
    const key = `${postId}_boosted`;

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/boost-post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, userSession: session }),
    });

    const result = await res.json();
    if (res.ok) {
      localStorage.setItem(key, 'true');
      setBoosted(true);
    } else {
      alert(result.error || 'Boost failed');
    }
  };

  return (
    <button
      className={`px-3 py-1 text-sm rounded ${
        boosted ? 'bg-gray-300 cursor-default' : 'bg-yellow-300 hover:bg-yellow-400'
      } transition`}
      onClick={handleBoost}
      disabled={boosted}
    >
      {boosted ? 'Boosted' : 'Boost'}
    </button>
  );
}
