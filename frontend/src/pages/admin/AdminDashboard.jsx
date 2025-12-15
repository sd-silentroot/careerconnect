/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { PlusCircle, Users, FileText } from "lucide-react"; // 🆕 added FileText icon
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg shadow-lg rounded-3xl p-10 text-center max-w-3xl w-full"
      >
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-10">
          Manage jobs, users, and applications easily from your control panel.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* ✅ Add / Manage Jobs */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/admin/jobs")}
            className="cursor-pointer bg-indigo-100 p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <PlusCircle className="text-indigo-600 w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold text-indigo-700 text-lg">
              Add / Manage Jobs
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Create, edit, or delete job postings.
            </p>
          </motion.div>

          {/* ✅ Manage Users */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/admin/manage-user")}
            className="cursor-pointer bg-yellow-100 p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <Users className="text-yellow-600 w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold text-yellow-700 text-lg">
              Manage Users
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              View and control registered users.
            </p>
          </motion.div>

          {/* 🆕 Manage Applications */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/admin/application")}
            className="cursor-pointer bg-green-100 p-6 rounded-2xl shadow hover:shadow-lg transition sm:col-span-2"
          >
            <FileText className="text-green-600 w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold text-green-700 text-lg">
              Manage Applications
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              View and update all submitted applications.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
