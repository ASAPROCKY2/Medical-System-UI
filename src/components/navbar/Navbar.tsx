import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const activeStyle = "bg-white/20 rounded-md font-bold";

  return (
    <nav className="navbar bg-teal-600 text-white shadow-lg px-4 md:px-8 py-3">
      {/* Left: Logo and Brand */}
      <div className="flex-1">
        <div className="flex items-center gap-3 cursor-default select-none">
          <img
            src={logo}
            alt="Hospital Logo"
            className="h-12 w-auto rounded-full border-2 border-white"
          />
          <div>
            <h1 className="text-xl font-bold">Smarter Medical System</h1>
            <p className="text-xs opacity-80">Management System</p>
          </div>
        </div>
      </div>

      {/* Center: Desktop Navigation */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal gap-2 text-base">
          <li>
            <NavLink
              to="/"
              data-testid="nav-home"
              className={({ isActive }) =>
                `px-4 py-2 hover:bg-white/10 rounded-md transition-colors ${
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
              data-testid="nav-about"
              className={({ isActive }) =>
                `px-4 py-2 hover:bg-white/10 rounded-md transition-colors ${
                  isActive ? activeStyle : ""
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              data-testid="nav-dashboard"
              className={({ isActive }) =>
                `px-4 py-2 hover:bg-white/10 rounded-md transition-colors ${
                  isActive ? activeStyle : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right: CTA Buttons */}
      <div className="flex-none gap-3 hidden lg:flex items-center">
        <NavLink
          to="/login"
          data-testid="nav-login"
          className="px-4 py-2 rounded-full border border-white/40 text-white hover:bg-white hover:text-teal-600 hover:shadow-md transition-all duration-200"
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          data-testid="nav-register"
          className="px-4 py-2 rounded-full bg-white text-teal-600 font-semibold hover:bg-gray-100 hover:shadow-md transition-all duration-200"
        >
          Register
        </NavLink>
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
              <NavLink to="/" data-testid="mobile-nav-home" className="text-lg py-3">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" data-testid="mobile-nav-about" className="text-lg py-3">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" data-testid="mobile-nav-dashboard" className="text-lg py-3">
                Dashboard
              </NavLink>
            </li>
            <div className="divider my-1"></div>
            <li>
              <NavLink
                to="/login"
                data-testid="mobile-nav-login"
                className="block rounded-full border border-white/30 text-center py-2 mt-2 hover:bg-white hover:text-teal-600 transition-all duration-200"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                data-testid="mobile-nav-register"
                className="block rounded-full bg-white text-teal-600 text-center font-semibold py-2 mt-2 hover:bg-gray-100 transition-all duration-200"
              >
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
