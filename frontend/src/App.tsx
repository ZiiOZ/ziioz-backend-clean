import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ZiiPostForm from './components/ZiiPostForm';
import ZiiPostFeed from './components/ZiiPostFeed';
import NotFound from './components/NotFound';
import AdminDashboard from './pages/AdminDashboard';

function ZiiPostPage() {
  console.log('✅ ZiiPostPage loaded');

  return (
    <div style={{ padding: 40 }}>
      <h1>ZiiPostPage test render ✅</h1>
    </div>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ziiposts" />} />
        <Route path="/ziiposts" element={<ZiiPostPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
