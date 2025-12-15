/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  BarChart3,
  BookOpen,
  Sparkles,
  User,
  Mail,
  Calendar,
  X,
} from "lucide-react";

export default function Dashboard() {
  const { user: contextUser, token } = useContext(AuthContext);
  const [user, setUser] = useState(contextUser || null);
  const [showProfile, setShowProfile] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) setUser(data);
        else console.error("⚠ Failed to load profile:", data.message);
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Profile updated successfully!");
        setUser(data.user);
        setIsUpdating(false);
      } else {
        alert(`⚠ Error: ${data.message}`);
      }
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Server error while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 text-center max-w-2xl w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-pink-100 opacity-70 blur-3xl -z-10" />

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold text-indigo-700 mb-3"
        >
          Welcome back, {user?.name || "Guest"} 👋
        </motion.h1>

        <p className="text-gray-600 mb-8 text-lg">
          Ready to explore your career path and achieve new milestones?
        </p>

        {/* User Info Card */}
        {/* User Profile Card — Gradient Aesthetic Version */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gradient-to-br from-white via-indigo-50 to-pink-50 rounded-3xl shadow-xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-2xl border border-indigo-100"
        >
          {/* Left Side - Avatar & Info */}
          <div className="flex items-center gap-5 w-full sm:w-1/2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-400 via-pink-400 to-purple-400 p-[2px]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <User className="w-10 h-10 text-indigo-600" />
                </div>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {user?.name || "Guest User"}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {user?.email || "guest@example.com"}
              </p>
              <button
                onClick={() => setShowProfile(true)}
                className="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all self-start"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Right Side - Gradient Info */}
          <div className="mt-6 sm:mt-0 bg-gradient-to-r from-indigo-100 via-white to-pink-100 rounded-2xl p-4 shadow-inner w-full sm:w-1/2 text-sm text-gray-700">
            <p className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-600">Joined:</span>
              <span>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
            <p className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-600">Account Type:</span>
              <span className="text-indigo-600 font-semibold">User</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Status:</span>
              <span className="text-green-600 font-semibold">Active</span>
            </p>
          </div>
        </motion.div>
        {/* Dashboard Cards (unchanged) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => (window.location.href = "/user/explore-careers")}
            className="group p-6 bg-indigo-600 text-white rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Briefcase className="mx-auto mb-3 w-10 h-10 group-hover:rotate-6 transition" />
            <h3 className="text-xl font-semibold mb-1">Explore Careers</h3>
            <p className="text-sm text-indigo-100">
              Discover tailored career options that match your interests.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => (window.location.href = "/user/track-progress")}
            className="group p-6 bg-white border border-gray-200 text-indigo-700 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <BarChart3 className="mx-auto mb-3 w-10 h-10 text-indigo-600 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-1">Track Progress</h3>
            <p className="text-sm text-gray-600">
              Monitor your skills and achievements as you grow.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => (window.location.href = "/user/resources")}
            className="group p-6 bg-gray-50 text-indigo-700 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <BookOpen className="mx-auto mb-3 w-10 h-10 text-indigo-500 group-hover:rotate-6 transition" />
            <h3 className="text-xl font-semibold mb-1">Resources</h3>
            <p className="text-sm text-gray-600">
              Access personalized learning materials and guides.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => (window.location.href = "/user/AIRecommendation")}
            className="group p-6 bg-indigo-100 text-indigo-800 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Sparkles className="mx-auto mb-3 w-10 h-10 text-indigo-500 group-hover:rotate-6 transition" />
            <h3 className="text-xl font-semibold mb-1">AI Recommendations</h3>
            <p className="text-sm text-gray-700">
              Get smart insights based on your performance and goals.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-[90%] max-w-md text-center relative"
            >
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-indigo-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <User className="w-10 h-10 text-indigo-600" />
              </div>

              <h2 className="text-2xl font-semibold text-indigo-700 mb-1">
                {user?.name || "Guest User"}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {user?.email || "guest@example.com"}
              </p>

              {/* Update Button */}
              <button
                onClick={() => setIsUpdating(true)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all mb-4"
              >
                Update Profile
              </button>

              {/* Update Form */}
              <AnimatePresence>
                {isUpdating && (
                  <motion.form
                    onSubmit={handleUpdateUser}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3 text-left bg-indigo-50 p-4 rounded-2xl shadow-inner"
                  >
                    <input
                      type="text"
                      placeholder="New Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                      type="email"
                      placeholder="New Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
                    >
                      {loading ? "Updating..." : "Save Changes"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="mt-4 space-y-2 text-left bg-indigo-50 p-4 rounded-2xl shadow-inner">
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-5 h-5 text-indigo-500" />{" "}
                  <span>{user?.email || "guest@example.com"}</span>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-5 h-5 text-indigo-500" />{" "}
                  <span>
                    Joined:{" "}
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
