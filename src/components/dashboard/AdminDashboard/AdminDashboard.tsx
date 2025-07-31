import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AdminDrawer from "./aside/AdminDrawer";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";

import { MdPeopleAlt, MdMedicalServices } from "react-icons/md";
import { RiCalendarEventFill } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { FaRegCommentDots, FaClipboardList, FaHeartbeat } from "react-icons/fa";
import { TbChecklist, TbShieldCheck } from "react-icons/tb";
import { IoIosBulb } from "react-icons/io";

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
  const [currentTime, setCurrentTime] = useState(new Date());

  const location = useLocation();
  const isDefaultRoute = location.pathname === "/admin";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://hospital-management-mdbf.onrender.com/admin/dashboard-stats");
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

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const stats = statsData
    ? [
        {
          icon: <MdPeopleAlt className="text-blue-600 text-2xl" />,
          value: statsData.patients.toLocaleString(),
          label: "Patients",
          bgColor: "bg-blue-50",
        },
        {
          icon: <MdMedicalServices className="text-green-600 text-2xl" />,
          value: statsData.doctors.toLocaleString(),
          label: "Doctors",
          bgColor: "bg-green-50",
        },
        {
          icon: <RiCalendarEventFill className="text-purple-600 text-2xl" />,
          value: statsData.appointments.toLocaleString(),
          label: "Appointments",
          bgColor: "bg-purple-50",
        },
        {
          icon: <BsCashCoin className="text-amber-600 text-2xl" />,
          value: `$${statsData.revenue.toLocaleString()}`,
          label: "Revenue",
          bgColor: "bg-amber-50",
        },
        {
          icon: <FaRegCommentDots className="text-pink-600 text-2xl" />,
          value: statsData.complaints.toLocaleString(),
          label: "Complaints",
          bgColor: "bg-pink-50",
        },
        {
          icon: <FaClipboardList className="text-indigo-600 text-2xl" />,
          value: statsData.prescriptions.toLocaleString(),
          label: "Prescriptions",
          bgColor: "bg-indigo-50",
        },
      ]
    : [];

  // Simple static info cards
  const infoCards = [
    {
      icon: <TbChecklist className="text-green-600 text-2xl" />,
      title: "Pending Tasks",
      description: "Review new complaints and check recent prescriptions.",
      bg: "bg-green-50",
    },
    {
      icon: <TbShieldCheck className="text-blue-600 text-2xl" />,
      title: "System Health",
      description: "All systems running smoothly. No issues reported.",
      bg: "bg-blue-50",
    },
    {
      icon: <IoIosBulb className="text-amber-500 text-2xl" />,
      title: "Reminder",
      description: "Schedule your weekly team meeting before Friday.",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        {/* Drawer */}
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
            <div className="space-y-6">
              {/* Greeting Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-6 top-6 opacity-20">
                  <FaHeartbeat className="text-white text-8xl" />
                </div>
                <div className="relative z-10">
                  <h1 className="text-3xl font-bold mb-1">
                    {greeting()}, Admin!
                  </h1>
                  <p className="text-blue-100 text-lg mb-2">
                    {currentTime.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-blue-200">
                    Here’s what’s happening today.
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              {loading ? (
                <p className="text-gray-600">Loading stats...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={`${stat.bgColor} p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center transition-all`}
                    >
                      <div className="p-3 rounded-full bg-white shadow-xs mb-2">
                        {stat.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-600 text-center">
                        {stat.label}
                      </span>
                      <h3 className="mt-1 text-xl font-bold text-gray-800">
                        {stat.value}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Static Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {infoCards.map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3 }}
                    className={`${card.bg} p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col transition-all`}
                  >
                    <div className="flex items-center mb-2">
                      <div className="p-3 rounded-full bg-white shadow-xs mr-3">
                        {card.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700">{card.description}</p>
                  </motion.div>
                ))}
              </div>
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
