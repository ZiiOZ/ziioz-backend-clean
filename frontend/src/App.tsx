import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ZiiPostForm from './components/ZiiPostForm'
import ZiiPostFeed from './components/ZiiPostFeed'
import NotFound from './components/NotFound'

function ZiiPostPage() {
  return (
    <div>
      <ZiiPostForm />
      <ZiiPostFeed />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ziiposts" />} />
        <Route path="/ziiposts" element={<ZiiPostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
