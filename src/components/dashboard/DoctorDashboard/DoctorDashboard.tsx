// src/dashboard/DoctorDashboard/DoctorDashboard.tsx
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DoctorDrawer from "./aside/DoctorDrawer";

import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";

import { FaUserInjured, FaClipboardList, FaPrescriptionBottleAlt } from "react-icons/fa";
import { RiCalendarEventFill } from "react-icons/ri";

const DoctorDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [statsData, setStatsData] = useState<{
    patients: number;
    appointments: number;
    prescriptions: number;
    complaints: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const isDefaultRoute = location.pathname === "/doctor";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Adjust this endpoint to match your backend for doctor stats
        const res = await fetch("http://localhost:8081/doctor/dashboard-stats");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStatsData(data);
      } catch (err: any) {
        setError(err.message || "Error fetching stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = statsData
    ? [
        {
          icon: <FaUserInjured className="text-blue-500 text-2xl" />,
          value: statsData.patients.toLocaleString(),
          label: "My Patients",
          change: "",
        },
        {
          icon: <RiCalendarEventFill className="text-purple-500 text-2xl" />,
          value: statsData.appointments.toLocaleString(),
          label: "Appointments",
          change: "",
        },
        {
          icon: <FaPrescriptionBottleAlt className="text-green-500 text-2xl" />,
          value: statsData.prescriptions.toLocaleString(),
          label: "Prescriptions",
          change: "",
        },
        {
          icon: <FaClipboardList className="text-pink-500 text-2xl" />,
          value: statsData.complaints.toLocaleString(),
          label: "Complaints",
          change: "",
        },
      ]
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        {/* Drawer Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300`}
        >
          <DoctorDrawer />
        </aside>

        {/* Overlay when drawer is open on small screens */}
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 lg:ml-64">
          {isDefaultRoute ? (
            <div className="space-y-8">
              {/* Welcome banner */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Doctor!</h1>
                <p className="text-green-100 text-sm sm:text-base">
                  Here’s your quick overview.
                </p>
              </div>

              {/* Stats Section */}
              {loading ? (
                <p className="text-gray-600">Loading stats...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border flex flex-col justify-between"
                    >
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-50 p-2 sm:p-3 rounded-full mb-2">
                          {stat.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-600 text-center whitespace-normal leading-tight">
                          {stat.label}
                        </span>
                      </div>
                      <div className="mt-3 sm:mt-4 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                          {stat.value}
                        </h3>
                        {stat.change && (
                          <p className="text-sm mt-1 text-green-500">{stat.change}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorDashboard;
