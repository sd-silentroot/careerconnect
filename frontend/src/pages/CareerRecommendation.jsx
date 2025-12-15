/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Loader2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        if (!res.ok) throw new Error("Failed to load jobs");

        const data = await res.json();

        let fetchedJobs = [];
        if (Array.isArray(data)) fetchedJobs = data;
        else if (Array.isArray(data.jobs)) fetchedJobs = data.jobs;

        setJobs(fetchedJobs);
        setFilteredJobs(fetchedJobs);
      } catch (err) {
        console.error(err);
        setJobs([]);
        setFilteredJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 🔍 FILTER LOGIC
  useEffect(() => {
    let data = jobs;

    // search
    if (searchText.trim() !== "") {
      data = data.filter(
        (job) =>
          job.title.toLowerCase().includes(searchText.toLowerCase()) ||
          job.company.toLowerCase().includes(searchText.toLowerCase()) ||
          job.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // location filter
    if (locationFilter !== "All") {
      data = data.filter((job) => job.location === locationFilter);
    }

    // company filter
    if (companyFilter !== "All") {
      data = data.filter((job) => job.company === companyFilter);
    }

    setFilteredJobs(data);
  }, [searchText, locationFilter, companyFilter, jobs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col items-center py-16 px-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8"
      >
        <h1 className="text-4xl font-bold text-indigo-700 text-center mb-2">
          Explore Careers
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Search and filter through real job opportunities.
        </p>

        {/* Search + Filters */}
        <div className="flex flex-col gap-5 mb-10">
          {/* Search Box */}
          <div className="flex items-center bg-white/70 backdrop-blur-lg rounded-2xl px-5 py-3 shadow-md border border-gray-200">
            <Search className="text-indigo-500 mr-3 w-5 h-5" />
            <input
              type="text"
              placeholder="Search job title, company or location..."
              className="flex-1 bg-transparent outline-none text-gray-700 text-lg"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Modern Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LOCATION FILTER */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-md border border-gray-200 px-4 py-3">
              <label className="text-sm text-gray-500 font-medium">
                Location
              </label>
              <select
                className="w-full mt-1 bg-transparent text-gray-800 font-semibold outline-none"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="All">All Locations</option>
                {[...new Set(jobs.map((j) => j.location))].map((loc) => (
                  <option key={loc} value={loc} className="text-gray-700">
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            {/* COMPANY FILTER */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-md border border-gray-200 px-4 py-3">
              <label className="text-sm text-gray-500 font-medium">
                Company
              </label>
              <select
                className="w-full mt-1 bg-transparent text-gray-800 font-semibold outline-none"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
              >
                <option value="All">All Companies</option>
                {[...new Set(jobs.map((j) => j.company))].map((comp) => (
                  <option key={comp} value={comp} className="text-gray-700">
                    {comp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Cards */}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No matching jobs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 180 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              >
                <Briefcase className="text-indigo-600 mb-3 w-8 h-8" />
                <h3 className="text-xl font-semibold text-indigo-700 mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">{job.company}</p>
                <p className="text-sm text-gray-500 mb-4">{job.location}</p>

                <button
                  onClick={() => navigate("/login")}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
