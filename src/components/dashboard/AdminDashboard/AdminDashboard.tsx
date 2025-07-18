import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AdminDrawer from "./aside/AdminDrawer";

// ✅ import your Navbar and Footer
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";

import { MdPeopleAlt, MdMedicalServices } from "react-icons/md";
import { RiCalendarEventFill } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statsData, setStatsData] = useState<{
    patients: number;
    doctors: number;
    appointments: number;
    revenue: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const isDefaultRoute = location.pathname === "/admin";

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:8081/admin/dashboard-stats");
        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }
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
          icon: <MdPeopleAlt className="text-blue-500 text-2xl" />,
          value: statsData.patients.toLocaleString(),
          label: "Patients",
          change: "+12%",
        },
        {
          icon: <MdMedicalServices className="text-green-500 text-2xl" />,
          value: statsData.doctors.toLocaleString(),
          label: "Doctors",
          change: "+3",
        },
        {
          icon: <RiCalendarEventFill className="text-purple-500 text-2xl" />,
          value: statsData.appointments.toLocaleString(),
          label: "Appointments",
          change: "Today",
        },
        {
          icon: <BsCashCoin className="text-amber-500 text-2xl" />,
          value: `$${statsData.revenue.toLocaleString()}`,
          label: "Revenue",
          change: "+8.2%",
        },
      ]
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Use your Navbar component */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar / Drawer */}
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

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-64">
          {isDefaultRoute ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
                <p className="text-blue-100">Here’s what’s happening today.</p>
              </div>

              {loading ? (
                <p className="text-gray-600">Loading stats...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-xl shadow-sm border"
                    >
                      <div className="flex items-center justify-between">
                        <div className="bg-blue-50 p-3 rounded-full">{stat.icon}</div>
                        <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                        <p
                          className={`text-sm mt-1 ${
                            stat.change.includes("+") ? "text-green-500" : "text-blue-500"
                          }`}
                        >
                          {stat.change}
                        </p>
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

      {/* ✅ Use your Footer component */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
