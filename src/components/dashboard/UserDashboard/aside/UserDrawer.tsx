import { Link, useLocation } from "react-router-dom";
import { userDrawerData } from "./drawerData";

type UserDrawerProps = {
  userImageUrl?: string | null;
};

const UserDrawer = ({ userImageUrl }: UserDrawerProps) => {
  const location = useLocation();

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">
        User Menu
      </h2>

      <ul className="flex-1">
        {userDrawerData.map((item) => {
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
                {item.id === "profile" && userImageUrl ? (
                  <img
                    src={userImageUrl}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <item.icon size={22} />
                )}
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserDrawer;
