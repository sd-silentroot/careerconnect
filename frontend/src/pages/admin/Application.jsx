/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, FileText, Trash2, X } from "lucide-react";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null); // ✅ Popup user details

  // ✅ Fetch all applications
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:5000/api/applications/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data.applications);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ✅ Update status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/applications/admin/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Status updated successfully!");
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error updating status");
    }
  };

  // ✅ Delete application
  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/applications/admin/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        alert("Application deleted successfully!");
        setApplications((prev) => prev.filter((app) => app._id !== id));
      } else {
        const data = await res.json();
        alert(`Failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting application");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  }

  // ✅ Safely parse resume/profile object
  const getProfileData = (app) => {
    try {
      return typeof app.resume === "string"
        ? JSON.parse(app.resume)
        : app.resume || {};
    } catch {
      return {};
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg shadow-lg rounded-3xl p-8"
      >
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-3">
          <FileText className="text-indigo-600" /> Manage Applications
        </h1>

        {applications.length === 0 ? (
          <p className="text-gray-600 text-center py-10">
            No applications found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="p-3 border">Applicant</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Job Title</th>
                  <th className="p-3 border">Company</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedApp(app)} // ✅ open details modal
                  >
                    <td className="p-3 border">{app.user?.name || "N/A"}</td>
                    <td className="p-3 border">{app.user?.email || "N/A"}</td>
                    <td className="p-3 border">{app.job?.title || "N/A"}</td>
                    <td className="p-3 border">{app.job?.company || "N/A"}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          app.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status || "Pending"}
                      </span>
                    </td>
                    <td
                      className="p-3 border space-x-2"
                      onClick={(e) => e.stopPropagation()} // ✅ prevent modal when clicking buttons
                    >
                      <button
                        onClick={() => updateStatus(app._id, "Approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(app._id, "Rejected")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => deleteApplication(app._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      {/* ✅ Modal for user profile details */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedApp(null)}
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              Applicant Details
            </h2>

            {(() => {
              const p = getProfileData(selectedApp);

              return (
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Full Name:</strong> {p.fullName || "N/A"}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {p.dob || "N/A"}
                  </p>
                  <p>
                    <strong>Address:</strong> {p.address || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {p.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {p.email || selectedApp.user?.email || "N/A"}
                  </p>

                  <hr className="my-3" />

                  <p className="font-semibold text-indigo-700">🎓 Education</p>
                  <p>
                    <strong>School:</strong> {p.education || "N/A"}
                  </p>
                  <p>
                    <strong>Degree:</strong> {p.degree || "N/A"}
                  </p>
                  <p>
                    <strong>Year Completed:</strong> {p.yearCompleted || "N/A"}
                  </p>

                  <hr className="my-3" />

                  <p className="font-semibold text-indigo-700">💼 Projects</p>
                  <p>{p.projects || "N/A"}</p>

                  <hr className="my-3" />

                  <p className="font-semibold text-indigo-700">🧠 Skills</p>
                  <p>{p.skills || "N/A"}</p>

                  <p className="font-semibold text-indigo-700 mt-3">
                    📜 Certifications
                  </p>
                  <p>{p.certifications || "N/A"}</p>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
