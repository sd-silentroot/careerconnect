/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  Briefcase,
  BarChart3,
} from "lucide-react";

export default function TrackProgress() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch user's job applications
  const fetchMyApplications = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const res = await fetch(
        "https://careerconnect-2xbz.onrender.com/api/applications/my",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-store",
          },
        }
      );

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server (check backend)");
      }

      if (!res.ok) throw new Error(data.message || "Failed to fetch progress");
      if (Array.isArray(data.applications)) setApplications(data.applications);
      else setApplications([]);
      setError(null);
    } catch (err) {
      setError(err.message);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchMyApplications, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading && applications.length === 0) {
      const retryTimeout = setTimeout(fetchMyApplications, 4000);
      return () => clearTimeout(retryTimeout);
    }
  }, [applications, loading]);

  // ================== Derived Statistics ==================
  const total = applications.length;
  const approved = applications.filter((a) => a.status === "Approved").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;
  const pending = total - approved - rejected;
  const successRate = total > 0 ? ((approved / total) * 100).toFixed(1) : 0;

  // ====================== UI ======================
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
      </div>
    );

  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg shadow-lg rounded-3xl p-8"
      >
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-3">
          <Briefcase className="text-indigo-600" /> Track Your Progress
        </h1>

        {/* ===================== Stats Overview ===================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm">
            <h2 className="text-lg font-semibold text-indigo-700">{total}</h2>
            <p className="text-gray-500 text-sm">Total Applied</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl text-center shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-700">{pending}</h2>
            <p className="text-gray-500 text-sm">Pending</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center shadow-sm">
            <h2 className="text-lg font-semibold text-green-700">{approved}</h2>
            <p className="text-gray-500 text-sm">Approved</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl text-center shadow-sm">
            <h2 className="text-lg font-semibold text-red-700">{rejected}</h2>
            <p className="text-gray-500 text-sm">Rejected</p>
          </div>
        </div>

        {/* ===================== Success Meter ===================== */}
        <div className="mb-10 bg-gray-100 rounded-xl p-4 text-center">
          <p className="font-medium text-gray-600 mb-2 flex justify-center items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            Success Rate
          </p>
          <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${successRate}% ` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {successRate}% Successful
          </p>
        </div>

        {/* ===================== Application Cards ===================== */}
        {applications.length === 0 ? (
          <p className="text-gray-600 text-center py-10">
            You haven’t applied for any jobs yet.
          </p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {app.job?.title}
                    </h2>
                    <p className="text-gray-500">{app.job?.company}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Applied on:{" "}
                      {new Date(app.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div>
                    {app.status === "Approved" ? (
                      <CheckCircle className="text-green-500 w-8 h-8" />
                    ) : app.status === "Rejected" ? (
                      <XCircle className="text-red-500 w-8 h-8" />
                    ) : (
                      <Clock className="text-yellow-500 w-8 h-8" />
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        app.status === "Approved"
                          ? "bg-green-500 w-full"
                          : app.status === "Rejected"
                          ? "bg-red-500 w-1/3"
                          : "bg-yellow-500 w-2/3"
                      }`}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        app.status === "Approved"
                          ? "text-green-600"
                          : app.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
