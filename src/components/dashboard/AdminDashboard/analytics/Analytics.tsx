// src/dashboard/AdminDashboard/Analytics.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Types for each dataset
type AppointmentsPerDay = { day: string; count: number };
type PatientsPerMonth = { month: string; count: number };
type DoctorsPerMonth = { month: string; count: number };
type PaymentsPerMonth = { month: string; count: number };
type ComplaintsPerMonth = { month: string; count: number };

const Analytics = () => {
  const [appointmentsPerDay, setAppointmentsPerDay] = useState<AppointmentsPerDay[]>([]);
  const [patientsPerMonth, setPatientsPerMonth] = useState<PatientsPerMonth[]>([]);
  const [doctorsPerMonth, setDoctorsPerMonth] = useState<DoctorsPerMonth[]>([]);
  const [paymentsPerMonth, setPaymentsPerMonth] = useState<PaymentsPerMonth[]>([]);
  const [complaintsPerMonth, setComplaintsPerMonth] = useState<ComplaintsPerMonth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Appointments per day
        const resAppointments = await fetch(
          "http://localhost:8081/admin/analytics/appointments-per-day"
        );
        if (!resAppointments.ok) throw new Error("Failed to fetch appointments per day");
        const appointmentsData = (await resAppointments.json()) as { day: string; count: string | number }[];
        setAppointmentsPerDay(
          appointmentsData.map((item) => ({ day: item.day, count: Number(item.count) }))
        );

        // Patients per month
        const resPatients = await fetch(
          "http://localhost:8081/admin/analytics/patients-per-month"
        );
        if (!resPatients.ok) throw new Error("Failed to fetch patients per month");
        const patientsData = (await resPatients.json()) as { month: string; count: string | number }[];
        setPatientsPerMonth(
          patientsData.map((item) => ({ month: item.month, count: Number(item.count) }))
        );

        // Doctors per month
        const resDoctors = await fetch(
          "http://localhost:8081/admin/analytics/doctors-per-month"
        );
        if (!resDoctors.ok) throw new Error("Failed to fetch doctors per month");
        const doctorsData = (await resDoctors.json()) as { month: string; count: string | number }[];
        setDoctorsPerMonth(
          doctorsData.map((item) => ({ month: item.month, count: Number(item.count) }))
        );

        // Payments per month
        const resPayments = await fetch(
          "http://localhost:8081/admin/analytics/payments-per-month"
        );
        if (!resPayments.ok) throw new Error("Failed to fetch payments per month");
        const paymentsData = (await resPayments.json()) as { month: string; count: string | number }[];
        setPaymentsPerMonth(
          paymentsData.map((item) => ({ month: item.month, count: Number(item.count) }))
        );

        // Complaints per month
        const resComplaints = await fetch(
          "http://localhost:8081/admin/analytics/complaints-per-month"
        );
        if (!resComplaints.ok) throw new Error("Failed to fetch complaints per month");
        const complaintsData = (await resComplaints.json()) as { month: string; count: string | number }[];
        setComplaintsPerMonth(
          complaintsData.map((item) => ({ month: item.month, count: Number(item.count) }))
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p className="p-6">Loading analytics…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 space-y-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800"
      >
        Analytics Overview
      </motion.h1>

      {/* Appointments per day */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Appointments Per Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={appointmentsPerDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Patients per month */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Patients Per Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={patientsPerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Doctors per month */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Doctors Per Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={doctorsPerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Payments per month */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Payments Per Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={paymentsPerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Complaints per month */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Complaints Per Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={complaintsPerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
