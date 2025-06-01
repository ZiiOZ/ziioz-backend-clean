import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ZiiPostFeed from './components/ZiiPostFeed';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ziiposts" element={<ZiiPostFeed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
