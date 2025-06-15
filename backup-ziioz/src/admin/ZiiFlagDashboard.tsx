// File: src/admin/ZiiFlagDashboard.tsx
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface FlaggedCase {
  id: string;
  user_id: string;
  flagged_by: string;
  reason: string;
  ai_score: number;
  case_status: string;
  evidence: any;
  created_at: string;
}

export default function ZiiFlagDashboard() {
  const [cases, setCases] = useState<FlaggedCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      const { data, error } = await supabase
        .from('flagged_cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Failed to fetch cases:', error);
      else setCases(data as FlaggedCase[]);

      setLoading(false);
    };

    fetchCases();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('flagged_cases')
      .update({ case_status: newStatus })
      .eq('id', id);

    if (!error) {
      setCases(prev =>
        prev.map(c => (c.id === id ? { ...c, case_status: newStatus } : c))
      );
    }
  };

  if (loading) return <div className="p-4">Loading flagged cases...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ZiiAdmin: Flagged Cases</h1>
      {cases.length === 0 ? (
        <p>No flagged cases found.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">User</th>
              <th className="p-2">Reason</th>
              <th className="p-2">AI Score</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.user_id.slice(0, 6)}...</td>
                <td className="p-2">{c.reason}</td>
                <td className="p-2">{c.ai_score}</td>
                <td className="p-2 font-medium">{c.case_status}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => updateStatus(c.id, 'approved')}
                  >Approve</button>
                  <button
                    className="bg-yellow-600 text-white px-2 py-1 rounded"
                    onClick={() => updateStatus(c.id, 'submitted')}
                  >Escalate</button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => updateStatus(c.id, 'dismissed')}
                  >Dismiss</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
