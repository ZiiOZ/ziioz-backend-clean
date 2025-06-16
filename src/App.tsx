import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LawDashboard from './pages/LawDashboard';
import AdminLawDashboard from './admin/AdminLawDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/law-dashboard" element={<LawDashboard />} />
          <Route path="/admin-law-dashboard" element={<AdminLawDashboard />} />

          {/* Optional 404 fallback */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen text-xl font-semibold">
                🚫 404 – Page Not Found
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
