import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

type Report = {
  id: string;
  content_type: 'post' | 'comment' | 'profile';
  content_id: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'escalated';
  created_at: string;
};

export default function LawDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    fetchReports();
  }, [filter]);

  async function fetchReports() {
    const { data, error } = await supabase
      .from('content_reports')
      .select('*')
      .eq('status', filter)
      .order('created_at', { ascending: false });

    if (!error) setReports(data as Report[]);
  }

  async function updateStatus(id: string, newStatus: Report['status']) {
    await supabase.from('content_reports').update({ status: newStatus }).eq('id', id);
    fetchReports();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ZiiOZ Law Enforcement Dashboard</h1>
      <div className="flex gap-2 mb-4">
        {['pending', 'reviewed', 'escalated'].map((s) => (
          <button
            key={s}
            className={`px-3 py-1 rounded ${filter === s ? 'bg-black text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <table className="w-full text-left text-sm border-t border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2">Type</th>
            <th className="p-2">Content ID</th>
            <th className="p-2">Reason</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="p-2 capitalize">{r.content_type}</td>
              <td className="p-2 text-blue-600">{r.content_id}</td>
              <td className="p-2">{r.reason}</td>
              <td className="p-2">{new Date(r.created_at).toLocaleString()}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => updateStatus(r.id, 'reviewed')} className="text-green-600">✓ Reviewed</button>
                <button onClick={() => updateStatus(r.id, 'escalated')} className="text-yellow-600">⚠ Escalate</button>
                <button onClick={() => updateStatus(r.id, 'pending')} className="text-gray-600">↺ Reset</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reports.length === 0 && (
        <div className="text-center mt-10 text-gray-500">No reports under "{filter}"</div>
      )}
    </div>
  );
}
