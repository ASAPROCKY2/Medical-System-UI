import {
  FaChartLine,
  FaCalendarCheck,
  FaPrescriptionBottleAlt,
  FaComments,
  FaMoneyBillWave,
  FaUserCircle,
  FaUserMd, 
} from "react-icons/fa";

export type DrawerData = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  link: string;
};


export const userDrawerData: DrawerData[] = [
  {
    id: "dashboard",
    name: "Dashboard Overview",
    icon: FaChartLine,
    link: "/user",
  },
  {
    id: "appointments",
    name: "My Appointments",
    icon: FaCalendarCheck,
    link: "/user/appointments",
  },
  {
    id: "prescriptions",
    name: "My Prescriptions",
    icon: FaPrescriptionBottleAlt,
    link: "/user/prescriptions",
  },
  {
    id: "complaints",
    name: "My Complaints",
    icon: FaComments,
    link: "/user/complaints",
  },
  {
    id: "payments",
    name: "My Payments",
    icon: FaMoneyBillWave,
    link: "/user/payments",
  },
  {
    id: "doctors",
    name: "Doctors",
    icon: FaUserMd,          
    link: "/user/doctors",  
  },
  {
    id: "profile",
    name: "My Profile",
    icon: FaUserCircle,
    link: "/user/profile",
  },
];
