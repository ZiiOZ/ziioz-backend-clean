import { BrowserRouter, Routes, Route } from "react-router-dom";
import LawDashboard from "./pages/LawDashboard";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<h1>Welcome to ZiiOZ</h1>} />
        <Route path="/lawdashboard" element={<LawDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
