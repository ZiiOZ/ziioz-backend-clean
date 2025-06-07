import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ZiiPostForm from './components/ZiiPostForm';
import ZiiPostFeed from './components/ZiiPostFeed';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './components/NotFound';

function ZiiPostPage() {// In App.tsx
console.log('⚡ App loaded');
console.log('window.location.pathname =', window.location.pathname);
  return <div style={{ padding: 40 }}><h1>ZiiPostPage test render ✅</h1></div>;
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
