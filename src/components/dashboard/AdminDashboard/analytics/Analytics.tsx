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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Skeleton } from "../../../../components/ui/skeleton";

// Types for each dataset
type DataPoint = {
  name: string;
  value: number;
  fill?: string;
};

const Analytics = () => {
  const [metrics, setMetrics] = useState({
    appointments: [] as DataPoint[],
    patients: [] as DataPoint[],
    doctors: [] as DataPoint[],
    payments: [] as DataPoint[],
    complaints: [] as DataPoint[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const colors = {
    appointments: "#3b82f6",
    patients: "#10b981",
    doctors: "#6366f1",
    payments: "#f59e0b",
    complaints: "#ef4444",
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const responses = await Promise.all([
          fetch("https://hospital-management-mdbf.onrender.com/admin/analytics/appointments-per-day"),
          fetch("https://hospital-management-mdbf.onrender.com/admin/analytics/patients-per-month"),
          fetch("https://hospital-management-mdbf.onrender.com/admin/analytics/doctors-per-month"),
          fetch("https://hospital-management-mdbf.onrender.com/admin/analytics/payments-per-month"),
          fetch("https://hospital-management-mdbf.onrender.com/admin/analytics/complaints-per-month"),
        ]);

        if (responses.some((res) => !res.ok)) {
          throw new Error("Some analytics data failed to load");
        }

        const [
          appointmentsData,
          patientsData,
          doctorsData,
          paymentsData,
          complaintsData,
        ] = await Promise.all(responses.map((res) => res.json()));

        setMetrics({
          appointments: appointmentsData.map((item: any) => ({
            name: item.day,
            value: Number(item.count),
            fill: colors.appointments,
          })),
          patients: patientsData.map((item: any) => ({
            name: item.month,
            value: Number(item.count),
            fill: colors.patients,
          })),
          doctors: doctorsData.map((item: any) => ({
            name: item.month,
            value: Number(item.count),
            fill: colors.doctors,
          })),
          payments: paymentsData.map((item: any) => ({
            name: item.month,
            value: Number(item.count),
            fill: colors.payments,
          })),
          complaints: complaintsData.map((item: any) => ({
            name: item.month,
            value: Number(item.count),
            fill: colors.complaints,
          })),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-1/3 mb-8" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg bg-white">
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        ))}
      </div>
    );

  if (error)
    return (
      <div className="p-6">
        <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
          <p className="text-red-600 font-semibold mb-2">Error Loading Analytics</p>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Analytics Dashboard
      </motion.h1>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <SummaryCard
          title="Appointments"
          value={metrics.appointments.reduce((sum, item) => sum + item.value, 0)}
          trend="day"
          color={colors.appointments}
        />
        <SummaryCard
          title="Patients"
          value={metrics.patients.reduce((sum, item) => sum + item.value, 0)}
          trend="month"
          color={colors.patients}
        />
        <SummaryCard
          title="Doctors"
          value={metrics.doctors.reduce((sum, item) => sum + item.value, 0)}
          trend="month"
          color={colors.doctors}
        />
        <SummaryCard
          title="Payments"
          value={metrics.payments.reduce((sum, item) => sum + item.value, 0)}
          trend="month"
          color={colors.payments}
        />
        <SummaryCard
          title="Complaints"
          value={metrics.complaints.reduce((sum, item) => sum + item.value, 0)}
          trend="month"
          color={colors.complaints}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Appointments Trend"
          data={metrics.appointments}
          type="line"
          color={colors.appointments}
        />
        <ChartCard
          title="Patients Growth"
          data={metrics.patients}
          type="bar"
          color={colors.patients}
        />
        <ChartCard
          title="Doctors Growth"
          data={metrics.doctors}
          type="bar"
          color={colors.doctors}
        />
        <ChartCard
          title="Payments Processed"
          data={metrics.payments}
          type="bar"
          color={colors.payments}
        />
        <div className="lg:col-span-2">
          <ChartCard
            title="Complaints Distribution"
            data={metrics.complaints}
            type="pie"
            color={colors.complaints}
          />
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({
  title,
  value,
  trend,
  color,
}: {
  title: string;
  value: number;
  trend: string;
  color: string;
}) => (
  <div className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold" style={{ color }}>
        {value}
      </span>
      <span className="text-sm text-gray-500">per {trend}</span>
    </div>
  </div>
);

const ChartCard = ({
  title,
  data,
  type,
  color,
}: {
  title: string;
  data: DataPoint[];
  type: "line" | "bar" | "pie";
  color: string;
}) => (
  <div className="p-4 border rounded-lg bg-white">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        {type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 4, fill: color }}
              activeDot={{ r: 6, fill: color }}
            />
          </LineChart>
        ) : type === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
  data={data}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={80}
  label={({ name, percent }) =>
    percent !== undefined ? `${name}: ${(percent * 100).toFixed(0)}%` : name
  }
>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={entry.fill || color} />
  ))}
</Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  </div>
);

export default Analytics;
