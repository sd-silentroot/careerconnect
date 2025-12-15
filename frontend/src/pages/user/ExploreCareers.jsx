/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

export default function ExploreCareers() {
  const { token } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showProfileSection, setShowProfileSection] = useState(false);
  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [fromApply, setFromApply] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    education: "",
    degree: "",
    yearCompleted: "",
    projects: "",
    skills: "",
    certifications: "",
  });

  // ✅ Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          "https://careerconnect-2xbz.onrender.com/api/jobs"
        );
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to load jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  // ✅ Load user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://careerconnect-2xbz.onrender.com/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          const p = data.profile || {}; // ✅ handle nested profile
          setProfile({
            fullName: p.fullName || "",
            dob: p.dob || "",
            address: p.address || "",
            phone: p.phone || "",
            email: data.email || "", // email still top-level
            education: p.education || "",
            degree: p.degree || "",
            yearCompleted: p.yearCompleted || "",
            projects: p.projects || "",
            skills: p.skills || "",
            certifications: p.certifications || "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  // ✅ Save/Update Profile manually
  const handleProfileSave = async (e) => {
    e.preventDefault();
    console.log("Profile being sent:", profile);
    try {
      const res = await fetch(
        "https://careerconnect-2xbz.onrender.com/api/users/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ profile }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("✅ Profile updated successfully!");
        setShowProfileSection(false);
      } else {
        alert(`⚠ ${data.message}`);
      }
    } catch (err) {
      console.error("Profile update error:", err);
    }
  };

  // ✅ Apply directly with updated details
  const submitApplication = async () => {
    if (!selectedJob) return;

    try {
      // STEP 1: Update profile first
      const updateRes = await fetch(
        "https://careerconnect-2xbz.onrender.com/api/users/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ profile }),
        }
      );

      const updateData = await updateRes.json();
      if (!updateRes.ok) {
        alert(`⚠ Failed to update details: ${updateData.message}`);
        return;
      }

      // STEP 2: Apply for the job after successful profile update
      const applyRes = await fetch(
        `https://careerconnect-2xbz.onrender.com/api/applications/apply/${selectedJob._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resume: JSON.stringify(profile),
            coverLetter: `Application for ${selectedJob.title}`,
          }),
        }
      );

      const applyData = await applyRes.json();
      if (applyRes.ok) {
        alert("✅ Application submitted successfully with updated details!");
        setShowEditPrompt(false);

        setShowProfileSection(false);
      } else {
        alert(`⚠ ${applyData.message}`);
      }
    } catch (err) {
      console.error("Apply error:", err);
    }
  };

  // ✅ Apply button click (updated as per new logic)
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowEditPrompt(true);
    setFromApply(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6 pt-24">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
        Explore Careers
      </h1>
      {/* My Details Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => {
            setShowProfileSection(!showProfileSection);
            if (!showProfileSection) {
              setSelectedJob(null);
            }
          }}
          className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          {showProfileSection ? "Close My Details" : "🧾 My Details"}
        </button>
      </div>
      {/* ✅ My Details Section */}
      {showProfileSection && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mb-10 border border-indigo-100"
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
            Job Application Details
          </h2>

          <form onSubmit={handleProfileSave} className="space-y-6">
            {/* PERSONAL INFO */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
                />
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) =>
                    setProfile({ ...profile, dob: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
                />
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
                Education
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="School / Institution"
                  value={profile.education}
                  onChange={(e) =>
                    setProfile({ ...profile, education: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Degree / Certification"
                  value={profile.degree}
                  onChange={(e) =>
                    setProfile({ ...profile, degree: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Year Completed"
                  value={profile.yearCompleted}
                  onChange={(e) =>
                    setProfile({ ...profile, yearCompleted: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
                />
              </div>
            </div>

            {/* PROJECTS */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
                Projects
              </h3>
              <textarea
                placeholder="List your recent projects"
                value={profile.projects}
                onChange={(e) =>
                  setProfile({ ...profile, projects: e.target.value })
                }
                className="w-full p-2 border rounded-lg h-20"
              />
            </div>

            {/* SKILLS & CERTIFICATIONS */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
                Skills & Certifications
              </h3>
              <textarea
                placeholder="List relevant skills"
                value={profile.skills}
                onChange={(e) =>
                  setProfile({ ...profile, skills: e.target.value })
                }
                className="w-full p-2 border rounded-lg h-20"
              />
              <textarea
                placeholder="Additional Certifications"
                value={profile.certifications}
                onChange={(e) =>
                  setProfile({ ...profile, certifications: e.target.value })
                }
                className="w-full p-2 border rounded-lg h-20 mt-3"
              />
            </div>

            {/* ✅ Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-lg font-medium"
              >
                Save Details
              </button>

              {/* ✅ Show Apply button ONLY if opened from job card */}
              {fromApply && selectedJob && (
                <button
                  type="button"
                  onClick={submitApplication}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition text-lg font-medium"
                >
                  Apply for {selectedJob.title}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      )}
      {/* ✅ Job List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <motion.div
            key={job._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-md rounded-2xl p-6 border border-indigo-100"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Company:</strong> {job.company}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-gray-600 text-sm mb-3">
              {job.description?.slice(0, 80)}...
            </p>
            <button
              onClick={() => handleApplyClick(job)}
              className="w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Apply Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* ✅ Apply confirmation popup */}
      {showEditPrompt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white relative rounded-3xl p-10 shadow-2xl w-[90%] max-w-2xl text-center transition-all duration-300">
            {/* ❌ Close Button */}
            <button
              onClick={() => setShowEditPrompt(false)}
              className="absolute top-4 right-5 text-gray-500 hover:text-red-500 text-3xl font-bold"
            >
              ×
            </button>

            <h3 className="text-2xl font-semibold text-gray-800 mb-8">
              Do you want to edit your details before applying?
            </h3>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => {
                  setShowProfileSection(true);
                  setShowEditPrompt(false);
                }}
                className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 transition"
              >
                Yes, Edit
              </button>

              <button
                onClick={() => {
                  submitApplication();
                  setShowEditPrompt(false);
                }}
                className="px-6 py-3 bg-green-600 text-white text-lg rounded-xl hover:bg-green-700 transition"
              >
                No, Apply Directly
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
