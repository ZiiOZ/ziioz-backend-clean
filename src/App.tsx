import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import lawdashboard from "./pages/lawdashboard"; // ✅ MUST match case exactly

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
