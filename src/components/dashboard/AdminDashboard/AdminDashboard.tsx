import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AdminDrawer from "./aside/AdminDrawer";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";

import { MdPeopleAlt, MdMedicalServices } from "react-icons/md";
import { RiCalendarEventFill } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { FaRegCommentDots, FaClipboardList } from "react-icons/fa";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [statsData, setStatsData] = useState<{
    patients: number;
    doctors: number;
    appointments: number;
    revenue: number;
    complaints: number;
    prescriptions: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const isDefaultRoute = location.pathname === "/admin";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:8081/admin/dashboard-stats");
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
          icon: <MdPeopleAlt className="text-white text-2xl" />,
          value: statsData.patients.toLocaleString(),
          label: "Patients",
          bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
        },
        {
          icon: <MdMedicalServices className="text-white text-2xl" />,
          value: statsData.doctors.toLocaleString(),
          label: "Doctors",
          bgColor: "bg-gradient-to-br from-green-500 to-green-600",
        },
        {
          icon: <RiCalendarEventFill className="text-white text-2xl" />,
          value: statsData.appointments.toLocaleString(),
          label: "Appointments",
          bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
        },
        {
          icon: <BsCashCoin className="text-white text-2xl" />,
          value: `$${statsData.revenue.toLocaleString()}`,
          label: "Revenue",
          bgColor: "bg-gradient-to-br from-amber-500 to-amber-600",
        },
        {
          icon: <FaRegCommentDots className="text-white text-2xl" />,
          value: statsData.complaints.toLocaleString(),
          label: "Complaints",
          bgColor: "bg-gradient-to-br from-pink-500 to-pink-600",
        },
        {
          icon: <FaClipboardList className="text-white text-2xl" />,
          value: statsData.prescriptions.toLocaleString(),
          label: "Prescriptions",
          bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        },
      ]
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300`}
        >
          <AdminDrawer />
        </aside>

        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        <main className="flex-1 p-6 lg:ml-64">
          {isDefaultRoute ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
                <p className="text-blue-100 text-sm sm:text-base">
                  Here’s what’s happening today.
                </p>
              </div>

              {loading ? (
                <p className="text-gray-600">Loading stats...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5, scale: 1.03 }}
                      className={`${stat.bgColor} p-4 sm:p-5 rounded-xl shadow-md text-white flex flex-col justify-between transition-transform duration-300`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="bg-white/20 p-3 rounded-full mb-2 shadow-inner">
                          {stat.icon}
                        </div>
                        <span className="text-sm font-medium text-center whitespace-normal leading-tight">
                          {stat.label}
                        </span>
                      </div>
                      <div className="mt-3 sm:mt-4 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold">{stat.value}</h3>
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

export default AdminDashboard;
