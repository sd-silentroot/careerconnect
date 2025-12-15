/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, PlusCircle, Trash2, Edit } from "lucide-react";

export default function AdminJobManagement() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
  });
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ✅ Create or Update Job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = sessionStorage.getItem("token");

    try {
      const method = editingJob ? "PUT" : "POST";
      const url = editingJob
        ? `http://localhost:5000/api/jobs/${editingJob._id}`
        : "http://localhost:5000/api/jobs";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newJob),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setNewJob({
          title: "",
          company: "",
          description: "",
          location: "",
          salary: "",
        });
        setEditingJob(null);
        fetchJobs();
      } else {
        alert(data.message || "Failed to save job");
      }
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Job
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      alert(data.message);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // ✅ Edit Job
  const handleEdit = (job) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      company: job.company,
      description: job.description,
      location: job.location,
      salary: job.salary || "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8"
      >
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          Admin Job Management
        </h1>

        {/* Job Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Job Title"
            className="border p-2 rounded-lg"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company"
            className="border p-2 rounded-lg"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded-lg"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Salary"
            className="border p-2 rounded-lg"
            value={newJob.salary}
            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded-lg sm:col-span-2 lg:col-span-3"
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-2 font-semibold flex items-center justify-center gap-2 sm:col-span-2 lg:col-span-3"
          >
            <PlusCircle size={20} />
            {loading ? "Saving..." : editingJob ? "Update Job" : "Add Job"}
          </button>
        </form>

        {/* Job List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              >
                <Briefcase className="text-indigo-600 mb-3 w-8 h-8" />
                <h3 className="text-lg font-semibold text-indigo-700 mb-1">
                  {job.title}
                </h3>
                <p className="text-gray-500 text-sm mb-1">{job.company}</p>
                <p className="text-gray-600 text-sm mb-2">{job.location}</p>
                <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                  {job.description}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleEdit(job)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No jobs posted yet.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
