import "./App.css";
import { Route, Routes } from "react-router-dom";

// Landing Pges
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";

// Interaksi
import Login from "./pages/login";

// Dashboard
import Dashboard from "./pages/dashboard";
import TambahTugas from "./pages/tambahTugas";

// Tugas
import BelumDikerjakan from "./pages/tugas/belumDikerjakan";
import SedangDikerjakan from "./pages/tugas/sedangDikerjakan";
import SelesaiDikerjakan from "./pages/tugas/selesaiDikerjakan";
import TidakDikerjakan from "./pages/tugas/tidakDikerjakan";

export default function App() {
  return (
    <Routes>
      {/* Landing Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Interaksi */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tambahTugas" element={<TambahTugas />} />

      {/* Tugas */}
      <Route path="/tugas/belumDikerjakan" element={<BelumDikerjakan />} />
      <Route path="/tugas/sedangDikerjakan" element={<SedangDikerjakan />} />
      <Route path="/tugas/selesaiDikerjakan" element={<SelesaiDikerjakan />} />
      <Route path="/tugas/tidakDikerjakan" element={<TidakDikerjakan />} />
    </Routes>
  );
}
