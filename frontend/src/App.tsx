import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ZiiPostFeed from './components/ZiiPostFeed'
import NotFound from './components/NotFound' // ✅ This is all you need

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ziiposts" element={<ZiiPostFeed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App // ✅ Proper export
