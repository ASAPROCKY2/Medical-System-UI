// src/dashboard/AdminDashboard/aside/AdminDrawer.tsx
import { Link, useLocation } from "react-router-dom";
import { adminDrawerData } from "./drawerData";

const AdminDrawer = () => {
  const location = useLocation(); // to highlight active link

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">
        Admin Menu
      </h2>

      {/* Loops through each item in the adminDrawerData */}
      <ul className="flex-1">
        {adminDrawerData.map((item) => {
          const isActive = location.pathname === item.link;

          return (
            <li key={item.id}>
              <Link
                to={item.link}
                className={`flex items-center gap-3 p-4 transition-all ${
                  isActive
                    ? "bg-gray-700 border-l-4 border-blue-400"
                    : "hover:bg-gray-700 hover:border-l-4 border-blue-400"
                }`}
              >
                <item.icon size={22} />
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminDrawer;
