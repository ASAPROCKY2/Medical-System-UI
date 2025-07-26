import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { motion } from "framer-motion";
import UserDrawer from "./aside/UserDrawer";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";

import { RiCalendarEventFill } from "react-icons/ri";
import { FaRegCommentDots, FaHeartbeat } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";

const UserDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statsData, setStatsData] = useState<{
    appointments: number;
    prescriptions: number;
    complaints: number;
    payments: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const token = useSelector((state: RootState) => state.user.token);
  const location = useLocation();
  const isDefaultRoute = location.pathname === "/user";

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        setError("No auth token found. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:8081/user/dashboard-stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Backend error: ${text}`);
        }
        const data = await res.json();
        setStatsData(data);
      } catch (err: any) {
        console.error("Error fetching stats:", err);
        setError(err.message || "Error fetching stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const stats = statsData
    ? [
        {
          icon: <RiCalendarEventFill className="text-purple-600 text-2xl" />,
          value: statsData.appointments.toLocaleString(),
          label: "My Appointments",
          bgColor: "bg-purple-50",
        },
        {
          icon: <MdMedicalServices className="text-green-600 text-2xl" />,
          value: statsData.prescriptions.toLocaleString(),
          label: "My Prescriptions",
          bgColor: "bg-green-50",
        },
        {
          icon: <FaRegCommentDots className="text-pink-600 text-2xl" />,
          value: statsData.complaints.toLocaleString(),
          label: "My Complaints",
          bgColor: "bg-pink-50",
        },
        {
          icon: <BsCashCoin className="text-amber-600 text-2xl" />,
          value: `$${statsData.payments.toLocaleString()}`,
          label: "My Payments",
          bgColor: "bg-amber-50",
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
          <UserDrawer />
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
              {/* Greeting Banner */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-6 top-6 opacity-20">
                  <FaHeartbeat className="text-white text-8xl" />
                </div>
                <div className="relative z-10">
                  <h1 className="text-3xl font-bold mb-1">{greeting()}!</h1>
                  <p className="text-indigo-100 text-lg mb-2">
                    {currentTime.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-indigo-200">
                    Here’s an overview of your recent activity.
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              {loading ? (
                <p className="text-gray-600">Loading stats…</p>
              ) : error ? (
                <p className="text-red-600">Failed to load stats: {error}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={`${stat.bgColor} p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center transition-all`}
                    >
                      <div className="p-3 rounded-full bg-white shadow-xs mb-3">
                        {stat.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-600 text-center">
                        {stat.label}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-gray-800">
                        {stat.value}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Quick Tips */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-blue-100 p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-blue-800 mb-3">
                  Quick Tips
                </h2>
                <ul className="list-disc list-inside space-y-2 text-blue-700 text-sm">
                  <li>Book appointments early to get your preferred time slots.</li>
                  <li>Track your prescriptions and set reminders for refills.</li>
                  <li>If something isn’t right, file a complaint and follow up.</li>
                  <li>Check your payment history to stay on top of bills.</li>
                </ul>
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

export default UserDashboard;
