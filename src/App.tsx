import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LawDashboard from "./pages/lawdashboard"; // ✅ MUST match case exactly

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lawdashboard" element={<LawDashboard />} />  {/* ✅ MUST match lowercase route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
