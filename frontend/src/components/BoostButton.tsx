import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function BoostButton({ commentId }: { commentId: string }) {
  const [boosted, setBoosted] = useState(false);
  const [boosts, setBoosts] = useState(0);

  useEffect(() => {
    // Check if already boosted this session
    const boostedComments = JSON.parse(localStorage.getItem('boostedComments') || '[]');
    if (boostedComments.includes(commentId)) {
      setBoosted(true);
    }

    // Fetch current boost count
    const fetchBoosts = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('boosts')
        .eq('id', commentId)
        .single();
      if (!error && data) setBoosts(data.boosts);
    };

    fetchBoosts();
  }, [commentId]);

  const handleBoost = async () => {
    if (boosted) {
      alert('You’ve already boosted this comment!');
      return;
    }

    const { error } = await supabase
      .from('comments')
      .update({ boosts: boosts + 1 })
      .eq('id', commentId);

    if (!error) {
      setBoosts(boosts + 1);
      setBoosted(true);
      const updated = JSON.parse(localStorage.getItem('boostedComments') || '[]');
      updated.push(commentId);
      localStorage.setItem('boostedComments', JSON.stringify(updated));
    }
  };

  return (
    <button
      onClick={handleBoost}
      className={`px-3 py-1 rounded-full text-xs ${
        boosted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      } text-white`}
      disabled={boosted}
    >
      Boost ({boosts})
    </button>
  );
}
