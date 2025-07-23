import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// ===== Public pages =====
import Register from "./pages/auth/Register";
import VerifyUser from "./pages/auth/VerifyUser";
import Login from "./pages/auth/Login";
import Landingpage from "./pages/Landingpage";
import AboutPage from "./pages/AboutPage";
import Profile from "./components/dashboard/AdminDashboard/profile";

// ===== Admin dashboard and pages =====
import AdminDashboard from "./components/dashboard/AdminDashboard/AdminDashboard";
import Appointments from "./components/dashboard/AdminDashboard/appointments/Appointments";
import Doctors from "./components/dashboard/AdminDashboard/doctor/Doctor";
import Complaints from "./components/dashboard/AdminDashboard/complaints/Complaints";
import Prescriptions from "./components/dashboard/AdminDashboard/prescription/Prescription";
import Patients from "./components/dashboard/AdminDashboard/patients/Patients";
import Payments from "./components/dashboard/AdminDashboard/payments/Payments";

import DoctorDashboard from "./components/dashboard/DoctorDashboard/DoctorDashboard";
import DoctorAppointments from "./components/dashboard/DoctorDashboard/appointments/Appointments";
import DoctorPrescriptions from "./components/dashboard/DoctorDashboard/prescriptions/Prescriptions";

import UserDashboard from "./components/dashboard/UserDashboard/UserDashboard";
import UserDoctors from "./components/dashboard/UserDashboard/doctor/Doctor";
import UserAppointments from "./components/dashboard/UserDashboard/appointments/Appointments";
import UserComplaints from "./components/dashboard/UserDashboard/complaints/Complaints";


import UserPrescriptions from "./components/dashboard/UserDashboard/prescriptions/Prescriptions";

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
          <Route path="/profile" element={<Profile />} />

          {/* ===== ADMIN ROUTES ===== */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/appointments" element={<Appointments />} />
          <Route path="/admin/doctors" element={<Doctors />} />
          <Route path="/admin/complaints" element={<Complaints />} />
          <Route path="/admin/prescriptions" element={<Prescriptions />} />
          <Route path="/admin/patients" element={<Patients />} />
          <Route path="/admin/payments" element={<Payments />} />

          {/* ===== DOCTOR ROUTES ===== */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />

          {/* ===== USER ROUTES ===== */}
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/doctors" element={<UserDoctors />} />
          <Route path="/user/appointments" element={<UserAppointments />} />
          <Route path="/user/complaints" element={<UserComplaints />} />

          <Route path="/user/prescriptions" element={<UserPrescriptions />} />
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
