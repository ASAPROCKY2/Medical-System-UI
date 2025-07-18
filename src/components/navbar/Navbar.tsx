import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  // Active link style
  const activeStyle = "bg-white/20 rounded-md font-bold";

  return (
    <nav className="navbar bg-teal-600 text-white shadow-lg px-4 md:px-8 py-3">
      {/* Left: Logo and Brand */}
      <div className="flex-1">
        <NavLink
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <img
            src={logo}
            alt="Hospital Logo"
            className="h-12 w-auto rounded-full border-2 border-white"
          />
          <div>
            <h1 className="text-xl font-bold">Smarter Hospital</h1>
            <p className="text-xs opacity-80">Management System</p>
          </div>
        </NavLink>
      </div>

      {/* Center: Desktop Navigation */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal gap-2 text-base">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 hover:bg-white/10 transition-colors ${
                  isActive ? activeStyle : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 hover:bg-white/10 transition-colors ${
                  isActive ? activeStyle : ""
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 hover:bg-white/10 transition-colors ${
                  isActive ? activeStyle : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right: CTA Buttons and Profile */}
      <div className="flex-none gap-4 hidden lg:flex items-center">
        <NavLink
          to="/login"
          className="btn btn-ghost hover:bg-white/10 border-white/20"
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="btn bg-white text-teal-600 hover:bg-gray-100 font-bold"
        >
          Register
        </NavLink>
        <button className="btn btn-sm bg-white text-teal-600 font-bold hover:bg-gray-100">
          Profile
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-teal-700 rounded-box w-64"
          >
            <li>
              <NavLink to="/" className="text-lg py-3">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-lg py-3">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="text-lg py-3">
                Dashboard
              </NavLink>
            </li>
            <div className="divider my-1"></div>
            <li>
              <NavLink
                to="/login"
                className="bg-white/10 text-center font-medium py-3 mt-1"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className="bg-white text-teal-600 text-center font-bold py-3"
              >
                Register
              </NavLink>
            </li>
            <li>
              <button className="btn btn-sm mt-2 bg-white text-teal-600 font-bold hover:bg-gray-100 w-full">
                Profile
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
