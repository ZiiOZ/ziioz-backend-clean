import PostCard from './PostCard';
import { useState } from 'react';
import './App.css';
import UserAvatar from './UserAvatar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import BoostButton from './BoostButton';
import ZiiPostForm from './ZiiPostForm';
import AuthForm from './AuthForm';

function App() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([
    {
      id: '1',
      content: 'Welcome to ZiiOZ! 🚀',
      imageUrl: '',
      visible: true,
    },
    {
      id: '2',
      content: 'This is a hidden sample post.',
      imageUrl: 'https://picsum.photos/400/200',
      visible: false,
    },
  ]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ✅ Home Route */}
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

        {/* ✅ Auth Route */}
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

export default App;
