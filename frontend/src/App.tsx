import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserAvatar from './UserAvatar';
import ScrollToTop from './ScrollToTop';
import BoostButton from './comments/BoostButton';
import ZiiPostForm from './ZiiPostForm';
import PostCard from './PostCard';
import AuthForm from './AuthForm';
import { supabase } from './supabaseClient';
import ZiiPostFeed from './ZiiPostFeed';

function App() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error(error);
      else setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <Router>
      <ScrollToTop />
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
                onClick={() => setCount((count) => count + 1)}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-8"
              >
                count is {count}
              </button>

              {/* ✅ Inject ZiiPostFeed here */}
              <div className="w-full max-w-md mt-6">
                <ZiiPostFeed />
              </div>

              <div className="mt-6 w-full max-w-md">
                <BoostButton postId="test-post-001" />
                <div className="mt-4">
                  <ZiiPostForm />
                </div>
              </div>
            </div>
          }
        />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

export default App;
