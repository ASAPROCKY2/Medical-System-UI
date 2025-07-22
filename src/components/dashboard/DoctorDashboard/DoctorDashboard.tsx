// src/dashboard/DoctorDashboard/DoctorDashboard.tsx
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DoctorDrawer from "./aside/DoctorDrawer";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import {
  FaUserInjured,
  FaClipboardList,
  FaPrescriptionBottleAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { RiCalendarEventFill } from "react-icons/ri";

const tips = [
  "Always double‑check a patient's allergies before prescribing medication.",
  "Take short breaks during long shifts to stay sharp.",
  "Good documentation helps your future self and your team.",
  "Clear communication with patients builds trust and better outcomes.",
];

const DoctorDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tipOfDay, setTipOfDay] = useState("");

  const location = useLocation();
  const isDefaultRoute = location.pathname === "/doctor";

  // update clock every minute
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // pick a random tip on mount
  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTipOfDay(randomTip);
  }, []);

  // calculate schedule completion based on hour
  const hour = currentTime.getHours();
  const progress = Math.min(Math.round((hour / 24) * 100), 100);

  // local "overview cards"
  const overviewCards = [
    {
      icon: <FaUserInjured className="text-blue-500 text-2xl" />,
      value: "—",
      label: "Patients Today",
      hint: "Linked to backend in future",
    },
    {
      icon: <RiCalendarEventFill className="text-purple-500 text-2xl" />,
      value: `${currentTime.toLocaleDateString()}`,
      label: "Date",
    },
    {
      icon: <FaPrescriptionBottleAlt className="text-green-500 text-2xl" />,
      value: `${currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      label: "Current Time",
    },
    {
      icon: <FaClipboardList className="text-pink-500 text-2xl" />,
      value: "—",
      label: "Pending Tasks",
      hint: "Hook this later",
    },
  ];

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
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, Doctor!
                </h1>
                <p className="text-green-100">
                  {currentTime.toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <button className="mt-4 bg-white text-green-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-green-50">
                  <FaCalendarAlt className="mr-2" />
                  View Today's Schedule
                </button>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {overviewCards.map((card, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center"
                  >
                    <div className="bg-blue-50 p-3 rounded-full mb-2">
                      {card.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-600 text-center">
                      {card.label}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-gray-800">
                      {card.value}
                    </h3>
                  </motion.div>
                ))}
              </div>

              {/* Progress card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Today’s Schedule Progress
                </h2>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-green-500 h-4 rounded-full text-right pr-2 text-xs font-medium text-white"
                    style={{ width: `${progress}%` }}
                  >
                    {progress}%
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {progress < 100
                    ? "You're making progress through your day."
                    : "Day complete!"}
                </p>
              </div>

              {/* Tip of the day */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">
                  Tip of the Day
                </h2>
                <p className="text-blue-700">{tipOfDay}</p>
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

export default DoctorDashboard;
