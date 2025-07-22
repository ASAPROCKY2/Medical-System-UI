// src/dashboard/DoctorDashboard/aside/drawerData.ts
import {
  FaChartLine,
  FaCalendarCheck,
 
  FaPrescriptionBottleAlt,
} from "react-icons/fa";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
};

// actual list of doctor drawer items
export const doctorDrawerData: DrawerData[] = [
  {
    id: "dashboard",
    name: "Dashboard Overview",
    icon: FaChartLine,
    link: "/doctor",
  },
  {
    id: "appointments",
    name: "My Appointments",
    icon: FaCalendarCheck,
    link: "/doctor/appointments",
  },
 
  {
    id: "prescriptions",
    name: "My Prescriptions",
    icon: FaPrescriptionBottleAlt,
    link: "/doctor/prescriptions",
  },
 
];
