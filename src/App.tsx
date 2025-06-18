import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LawDashboard from "./pages/lawdashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lawdashboard" element={<lawdashboard />} />  {/* ✅ MUST match lowercase route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
