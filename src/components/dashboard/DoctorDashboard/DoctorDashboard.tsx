import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DoctorDrawer from "./aside/DoctorDrawer";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import { FaPrescriptionBottleAlt, FaCalendarAlt, FaStethoscope, FaHeartbeat } from "react-icons/fa";
import { RiCalendarEventFill, RiFlaskLine } from "react-icons/ri";
import { WiDaySunny } from "react-icons/wi";

const tips = [
  "Always double-check a patient's allergies before prescribing medication.",
  "Take short breaks during long shifts to stay sharp.",
  "Good documentation helps your future self and your team.",
  "Clear communication with patients builds trust and better outcomes.",
  "A quick mental reset can improve your focus for the next patient.",
];

const DoctorDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tipOfDay, setTipOfDay] = useState("");

  const location = useLocation();
  const isDefaultRoute = location.pathname === "/doctor";

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTipOfDay(randomTip);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const overviewCards = [
    {
      icon: <RiCalendarEventFill className="text-purple-500 text-2xl" />,
      value: currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
      label: "Today's Date",
      bgColor: "bg-purple-50"
    },
    {
      icon: <FaPrescriptionBottleAlt className="text-green-500 text-2xl" />,
      value: currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      label: "Current Time",
      bgColor: "bg-green-50"
    },
    {
      icon: <FaStethoscope className="text-blue-500 text-2xl" />,
      value: "Ready",
      label: "Your Status",
      bgColor: "bg-blue-50"
    },
    {
      icon: <WiDaySunny className="text-yellow-500 text-3xl" />,
      value: `${greeting()}`,
      label: "Greeting",
      bgColor: "bg-yellow-50"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
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

        <main className="flex-1 p-6 lg:ml-64">
          {isDefaultRoute ? (
            <div className="space-y-8">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-6 top-6 opacity-20">
                  <FaHeartbeat className="text-white text-8xl" />
                </div>
                <div className="relative z-10">
                  <h1 className="text-3xl font-bold mb-1">{greeting()}, Doctor!</h1>
                  <p className="text-blue-100 text-lg mb-4">
                    {currentTime.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-white text-blue-700 px-4 py-2 rounded-xl font-medium flex items-center hover:bg-blue-50 transition-all shadow-sm">
                      <FaCalendarAlt className="mr-2" />
                      Today's Schedule
                    </button>
                    <button className="bg-blue-700 bg-opacity-30 text-white px-4 py-2 rounded-xl font-medium flex items-center hover:bg-opacity-40 transition-all border border-white border-opacity-30 shadow-sm">
                      <FaPrescriptionBottleAlt className="mr-2" />
                      Quick Prescription
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {overviewCards.map((card, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`${card.bgColor} p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center transition-all`}
                  >
                    <div className="p-3 rounded-full bg-white shadow-xs mb-3">
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

              {/* Tip of the day */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-blue-100 p-5 rounded-xl shadow-sm"
              >
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <RiFlaskLine className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-blue-800 mb-1">
                      Clinical Tip of the Day
                    </h2>
                    <p className="text-blue-700">{tipOfDay}</p>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex flex-col items-center">
                  <div className="bg-indigo-100 p-3 rounded-full mb-2 text-indigo-600">
                    <FaCalendarAlt className="text-xl" />
                  </div>
                  <span className="text-sm font-medium">New Appointment</span>
                </button>
                <button className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex flex-col items-center">
                  <div className="bg-green-100 p-3 rounded-full mb-2 text-green-600">
                    <FaPrescriptionBottleAlt className="text-xl" />
                  </div>
                  <span className="text-sm font-medium">New Prescription</span>
                </button>
                <button className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-2 text-blue-600">
                    <FaStethoscope className="text-xl" />
                  </div>
                  <span className="text-sm font-medium">Patient Lookup</span>
                </button>
                <button className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex flex-col items-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-2 text-purple-600">
                    <RiCalendarEventFill className="text-xl" />
                  </div>
                  <span className="text-sm font-medium">My Calendar</span>
                </button>
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