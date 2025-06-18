// ✅ App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LawDashboard from "./pages/lawdashboard"; // ✅ this is the file name (lowercase)
                                                // ✅ but component name is still PascalCase

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lawdashboard" element={<LawDashboard />} /> {/* ✅ Corrected casing */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
