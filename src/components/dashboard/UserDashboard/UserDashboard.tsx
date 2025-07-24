// src/dashboard/UserDashboard/UserDashboard.tsx
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { motion } from "framer-motion";
import UserDrawer from "./aside/UserDrawer";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";

import { RiCalendarEventFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
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

  // get token from redux (persisted by redux-persist)
  const token = useSelector((state: RootState) => state.user.token);

  const location = useLocation();
  const isDefaultRoute = location.pathname === "/user";

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
          const errorText = await res.text();
          throw new Error(`Backend error: ${errorText}`);
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

  const stats = statsData
    ? [
        {
          icon: <RiCalendarEventFill className="text-purple-500 text-2xl" />,
          value: statsData.appointments.toLocaleString(),
          label: "My Appointments",
        },
        {
          icon: <MdMedicalServices className="text-green-500 text-2xl" />,
          value: statsData.prescriptions.toLocaleString(),
          label: "My Prescriptions",
        },
        {
          icon: <FaRegCommentDots className="text-pink-500 text-2xl" />,
          value: statsData.complaints.toLocaleString(),
          label: "My Complaints",
        },
        {
          icon: <BsCashCoin className="text-amber-500 text-2xl" />,
          value: `$${statsData.payments.toLocaleString()}`,
          label: "My Payments",
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
          <UserDrawer />
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
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl p-6 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
                <p className="text-indigo-100 text-sm sm:text-base">
                  Here’s an overview of your recent activity.
                </p>
              </div>

              {/* Stats */}
              {loading ? (
                <p className="text-gray-600">Loading stats…</p>
              ) : error ? (
                <p className="text-red-600">Failed to load stats: {error}</p>
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
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Quick Tips */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h2 className="text-lg font-bold mb-3 text-gray-800">
                  Quick Tips
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Book appointments early to get your preferred time slots.</li>
                  <li>Track your prescriptions here and set reminders to refill on time.</li>
                  <li>If something isn’t right, you can file a complaint and follow its status.</li>
                  <li>Check your payment history to stay on top of your bills.</li>
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
