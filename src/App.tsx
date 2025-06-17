import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LawDashboard from "./pages/LawDashboard"; // ✅ Must exist at src/pages/LawDashboard.tsx

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lawdashboard" element={<LawDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
