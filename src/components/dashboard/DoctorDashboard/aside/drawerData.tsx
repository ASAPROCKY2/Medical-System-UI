// src/dashboard/DoctorDashboard/aside/drawerData.ts
import {
  FaChartLine,
  FaCalendarCheck,
  FaPrescriptionBottleAlt,
  FaUserCircle, // default icon for profile if image isn't used
} from "react-icons/fa";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
};

export const doctorDrawerData: DrawerData[] = [

{
    id: "profile",
    name: "My Profile",
    icon: FaUserCircle, 
    link: "/doctor/profile",
  },





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
