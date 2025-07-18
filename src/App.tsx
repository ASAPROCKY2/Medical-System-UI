import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Public pages
import Register from "./pages/auth/Register";
import VerifyUser from "./pages/auth/VerifyUser";
import Login from "./pages/auth/Login";
import Landingpage from "./pages/Landingpage";
import AboutPage from "./pages/AboutPage";

// Admin dashboard layout
import AdminDashboard from "./components/dashboard/AdminDashboard/AdminDashboard";
// Admin pages
import Appointments from "./components/dashboard/AdminDashboard/appointments/Appointments";
import Doctors from "./components/dashboard/AdminDashboard/doctor/Doctor";
import Complaints from "./components/dashboard/AdminDashboard/complaints/Complaints";
import Prescriptions from "./components/dashboard/AdminDashboard/prescription/Prescription"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/verify" element={<VerifyUser />} />
          <Route path="/login" element={<Login />} />

          {/* ===== ADMIN ROUTES ===== */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/appointments" element={<Appointments />} />
          <Route path="/admin/doctors" element={<Doctors />} />
          <Route path="/admin/complaints" element={<Complaints />} />
          <Route path="/admin/prescriptions" element={<Prescriptions />} /> {/* ✅ added */}
        </Routes>
      </BrowserRouter>

      {/* Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "bg-red-500 text-white",
            success: "bg-green-500 text-white",
            info: "bg-blue-500 text-white",
          },
        }}
      />
    </>
  );
}

export default App;
