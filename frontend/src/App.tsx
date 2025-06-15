import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ZiiPostFeed from "./ZiiPostFeed";

// Inside <Routes>...
<Route path="/posts" element={<ZiiPostFeed />} />

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-600">
        🚀 Welcome to ZiiOZ Home
      </h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Placeholder routes for coming components */}
        <Route path="/posts" element={<div>Post Feed coming soon...</div>} />
        <Route path="/admin" element={<div>Admin Panel</div>} />
      </Routes>
    </Router>
  );
}
