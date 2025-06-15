// src/components/BoostButton.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface BoostButtonProps {
  commentId: number;
}

export default function BoostButton({ commentId }: BoostButtonProps) {
  const [hasBoosted, setHasBoosted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const boosted = sessionStorage.getItem(`boosted_${commentId}`);
    if (boosted) setHasBoosted(true);
  }, [commentId]);

  const handleBoost = async () => {
    if (hasBoosted) return;
    const sessionKey = `boosted_count`;
    const sessionBoosts = parseInt(sessionStorage.getItem(sessionKey) || '0');

    if (sessionBoosts >= 3) {
      alert('⚠️ Boost limit reached for this session.');
      return;
    }

    setLoading(true);
    const userSession = sessionStorage.getItem('ziioz_user') || crypto.randomUUID();
    sessionStorage.setItem('ziioz_user', userSession);

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/boost-comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId, userSession })
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      sessionStorage.setItem(`boosted_${commentId}`, 'true');
      sessionStorage.setItem(sessionKey, String(sessionBoosts + 1));
      setHasBoosted(true);
    } else {
      alert(data.error || '⚠️ Boost failed.');
    }
  };

  return (
    <button
      onClick={handleBoost}
      disabled={hasBoosted || loading}
      className={`px-3 py-1 text-sm rounded ${hasBoosted ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
    >
      {hasBoosted ? 'Boosted ✅' : loading ? 'Boosting...' : 'Boost 🚀'}
    </button>
  );
}
