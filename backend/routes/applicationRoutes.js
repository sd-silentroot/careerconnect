const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Job = require("../models/job");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

// ✅ Apply for a job
router.post("/apply/:jobId", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { resume, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      user: req.user.id,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You already applied for this job" });
    }

    // Create new application
    const application = new Application({
      job: jobId,
      user: req.user.id,
      resume,
      coverLetter,
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
// ===================== USER: GET THEIR APPLICATIONS =====================
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate("job", "title company")
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ===================== ADMIN: GET ALL APPLICATIONS =====================
router.get("/admin/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title company")
      .populate("user", "name email");
    res.json({ count: applications.length, applications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ===================== ADMIN: UPDATE APPLICATION STATUS =====================
router.put(
  "/admin/status/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { status } = req.body;
      const application = await Application.findById(req.params.id);

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      application.status = status;
      await application.save();

      res.json({ message: "Status updated successfully!", application });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// ===================== ADMIN: DELETE APPLICATION =====================
router.delete(
  "/admin/delete/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const application = await Application.findById(req.params.id);

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      await application.deleteOne();

      res.json({ message: "Application deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
