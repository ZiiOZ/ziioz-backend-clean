import { useState } from 'react';
import './App.css';
import UserAvatar from './UserAvatar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

function App() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]); // Simulate an empty post feed

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
              <h1 className="text-4xl font-bold text-blue-600 mb-6">
                Tailwind is Working!
              </h1>

              {/* ✅ Avatar Preview */}
              <div className="mb-4 flex items-center space-x-4">
                <UserAvatar />
                <UserAvatar imageUrl="https://i.pravatar.cc/100" />
              </div>

              {/* ✅ Button */}
              <button
                onClick={() => setCount((count) => count + 1)}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-8"
              >
                count is {count}
              </button>

              {/* ✅ Empty Feed Message */}
              {posts.length === 0 && (
                <div className="text-center text-gray-500 text-xl mt-4">
                  🫠 Nothing here yet... Be the first to post something amazing!
                </div>
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
