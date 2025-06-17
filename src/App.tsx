// src/App.tsx
// Add to the top of every .tsx file (especially if older Vite/TypeScript version)
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LawDashboard from "./pages/LawDashboard";
import Home from "./pages/Home";

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
