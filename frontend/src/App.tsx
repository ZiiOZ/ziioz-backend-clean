import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './ScrollToTop';
import UserAvatar from './UserAvatar';
import BoostButton from './comments/BoostButton';
import ZiiPostForm from './ZiiPostForm';
import PostCard from './PostCard';
import AuthForm from './AuthForm';
import ZiiPostFeed from './ZiiPostFeed';
import { supabase } from './supabaseClient';
import ZiiPay from './ZiiPay';
import ZiiShop from './ZiiShop';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfUse from './TermsOfUse';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';

function App() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error loading posts:', error);
      else setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <Router>
      <ScrollToTop />

      {localStorage.getItem('ziioz_admin') === 'true' && (
        <div className="fixed top-2 right-2 bg-black text-white text-xs px-3 py-1 rounded-full shadow-lg z-50">
          🛡️ Admin Mode
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
              <div className="w-full bg-green-100 text-green-700 text-center py-2 text-sm font-medium shadow-sm mb-4">
                🟢 ZiiOZ is Live — Join the movement!
              </div>

              <h1 className="text-4xl font-bold text-blue-600 mb-6">
                Tailwind is Working!
              </h1>

              <div className="mb-4 flex items-center space-x-4">
                <UserAvatar />
                <UserAvatar imageUrl="https://i.pravatar.cc/100" />
              </div>

              <button
                onClick={() => setCount(count + 1)}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-8"
              >
                count is {count}
              </button>

              {posts.length === 0 ? (
                <div className="text-center text-gray-500 text-xl mt-4">
                  🫠 Nothing here yet... Be the first to post something amazing!
                </div>
              ) : (
                <div className="w-full max-w-md mt-4">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onDelete={(id) => setPosts(posts.filter((p) => p.id !== id))}
                      onToggleVisibility={(id) =>
                        setPosts((prev) =>
                          prev.map((p) =>
                            p.id === id ? { ...p, visible: !p.visible } : p
                          )
                        )
                      }
                    />
                  ))}
                </div>
              )}

              <div className="mt-6 w-full max-w-md">
                <BoostButton postId="test-post-001" />
                <div className="mt-4">
                  <ZiiPostForm />
                </div>
              </div>
            </div>
          }
        />
        <Route path="/ziishop" element={<ZiiShop />} />
        <Route path="/ziiposts" element={<ZiiPostFeed />} />
        <Route path="/ziipay" element={<ZiiPay />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/admin"
          element={
            localStorage.getItem('ziioz_admin') === 'true' ? (
              <AdminDashboard />
            ) : (
              <div className="min-h-screen flex items-center justify-center text-center text-red-600 p-8">
                🚫 Access Denied — You are not authorized to view this page.
              </div>
            )
          }
        />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
      </Routes>

      {/* ✅ Safe to put outside <Routes> */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around py-2 z-40 sm:hidden">
        <a href="/" className="text-xs text-gray-600 hover:text-black">🏠 Home</a>
        <a href="/ziiposts" className="text-xs text-gray-600 hover:text-black">📰 Feed</a>
        <a href="/ziishop" className="text-xs text-gray-600 hover:text-black">🛍️ Shop</a>
        <a href="/settings" className="text-xs text-gray-600 hover:text-black">⚙️ Settings</a>
      </div>

      <footer className="text-xs text-gray-400 text-center mt-10 mb-4">
        <a href="/privacy" className="underline mr-4">Privacy Policy</a>
        <a href="/terms" className="underline mr-4">Terms of Use</a>
        <a href="/settings" className="underline">Settings</a>
      </footer>
    </Router>
  );
}

export default App;
