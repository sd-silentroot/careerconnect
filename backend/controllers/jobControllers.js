const Job = require("../models/job");

// Create a new job (Admin/HR only)
const createJob = async (req, res) => {
  try {
    const { title, company, description, location, salary } = req.body;

    if (!title || !company || !description || !location) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const job = new Job({
      title,
      company,
      description,
      location,
      salary,
      postedBy: req.user.id, // login user ID
    });

    const savedJob = await job.save();
    res
      .status(201)
      .json({ message: "Job created successfully!", job: savedJob });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all jobs (Public)
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update a job (Admin only)
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ message: "Job updated successfully!", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete a job (Admin only)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    await job.deleteOne();
    res.json({ message: "Job deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };
