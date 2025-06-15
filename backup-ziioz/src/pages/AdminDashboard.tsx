// ...existing imports...
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [moderationQueue, setModerationQueue] = useState([]);
  const [signups, setSignups] = useState([]);
  const [creatorEarnings, setCreatorEarnings] = useState([]);
  const [filteredSignups, setFilteredSignups] = useState([]);
  const [suspiciousAccounts, setSuspiciousAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [boostsToday, setBoostsToday] = useState(0);
  const [dailyUsers, setDailyUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [postTrend, setPostTrend] = useState([]);
  const [boostTrend, setBoostTrend] = useState([]);
  const [countryMap, setCountryMap] = useState({});

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(() => {
      fetchAnalytics();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = signups.filter(s => {
      const matchName = s.username?.toLowerCase().includes(search.toLowerCase());
      const matchCountry = countryFilter ? s.country === countryFilter : true;
      return matchName && matchCountry;
    });
    setFilteredSignups(filtered);
  }, [search, countryFilter, signups]);

  const fetchAnalytics = async () => {
    setLoading(true);

    const { data: flaggedPosts } = await supabase
      .from('posts')
      .select('id, content, flagged, profile_id')
      .eq('flagged', true)
      .limit(25);

    // store moderation queue
    setModerationQueue(flaggedPosts || []);

    setLoading(false);
  };

  const handleModerationAction = async (id, action) => {
    if (action === 'delete') {
      await supabase.from('posts').delete().eq('id', id);
    } else if (action === 'approve') {
      await supabase.from('posts').update({ flagged: false }).eq('id', id);
    }
    setModerationQueue((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-white text-black">
      <h1 className="text-2xl font-semibold mb-4">ZiiOZ Admin Dashboard</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="space-y-6">
          {/* ...existing dashboard components... */}

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">🛡️ Moderation Panel</h2>
            {moderationQueue.length === 0 ? (
              <p className="text-sm text-gray-500">No flagged posts currently.</p>
            ) : (
              <ul className="space-y-2">
                {moderationQueue.map((post) => (
                  <li key={post.id} className="bg-yellow-50 p-3 rounded-lg border border-yellow-300">
                    <p className="font-medium text-yellow-800">Post ID: {post.id}</p>
                    <p className="text-sm text-yellow-700 mb-2">{post.content || 'No content preview.'}</p>
                    <div className="flex space-x-4">
                      <button
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded"
                        onClick={() => handleModerationAction(post.id, 'approve')}
                      >Mark Safe</button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded"
                        onClick={() => handleModerationAction(post.id, 'delete')}
                      >Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
