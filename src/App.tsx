import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LawDashboard from "./pages/lawdashboard"; // ✅ This is the default export name

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lawdashboard" element={<LawDashboard />} /> {/* ✅ FIXED */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
