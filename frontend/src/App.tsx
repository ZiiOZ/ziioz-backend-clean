import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ZiiPostFeed from './components/ZiiPostFeed'
import NotFound from './components/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ziiposts" />} />
        <Route path="/ziiposts" element={<ZiiPostFeed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
