/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Home, Briefcase, Info, Phone, X, User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  // Auto-close mobile menu when switching to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={20} /> },
    { name: "About Us", path: "/about", icon: <Info size={20} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          CareerConnect
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {/* Show Careers only if user NOT logged in */}
          {!user && (
            <li>
              <Link
                to="/careers"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Careers
              </Link>
            </li>
          )}

          {user && (
            <>
              <li>
                <Link
                  to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                  className="text-gray-700 hover:text-indigo-600 transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-red-500 hover:text-red-700 font-semibold transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger */}
        {!menuOpen && (
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-lg focus:outline-none"
          >
            <span className="w-6 h-0.5 bg-gray-700 block mb-1"></span>
            <span className="w-6 h-0.5 bg-gray-700 block mb-1"></span>
            <span className="w-6 h-0.5 bg-gray-700 block"></span>
          </button>
        )}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-72 h-full 
           bg-gradient-to-b from-indigo-100 via-white/80 to-gray-100
           backdrop-blur-xl shadow-2xl
           z-50 flex flex-col border-l border-gray-300"
          >
            {/* Close Button – SAME position as hamburger */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full"
            >
              <X size={28} className="text-gray-700" />
            </button>

            {/* Sidebar Header */}
            <div className="px-6 pt-16 pb-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            </div>

            {/* Menu Items List */}
            <div className="flex flex-col space-y-4 px-6 pt-6 text-lg font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                >
                  {item.icon} {item.name}
                </Link>
              ))}
              {/* Show Careers only when NOT logged in */}
              {!user && (
                <Link
                  to="/careers"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                >
                  <Briefcase size={20} /> Careers
                </Link>
              )}

              {user && (
                <>
                  <Link
                    to={
                      user.role === "admin" ? "/admin/dashboard" : "/dashboard"
                    }
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
                  >
                    <User size={20} /> Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      navigate("/");
                    }}
                    className="text-red-600 font-semibold text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
            <div
              className="mt-auto w-full px-6 py-5 
                bg-white/60 backdrop-blur-lg border-t 
                text-center text-gray-500 text-sm"
            >
              Powered by{" "}
              <span className="text-indigo-600 font-semibold">
                CareerConnect
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
