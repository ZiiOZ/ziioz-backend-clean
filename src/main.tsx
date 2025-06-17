import { BrowserRouter, Routes, Route } from "react-router-dom";
import LawDashboard from "@/pages/LawDashboard";
// import other routes...

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/lawdashboard" element={<LawDashboard />} />
    {/* other routes */}
  </Routes>
</BrowserRouter>
