const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
const Job = require("../models/job");

const router = express.Router();

// Public Routes
router.get("/", getJobs); // saare jobs list
router.get("/:id", getJobById); // single job by ID

// Admin Routes
router.post("/", authMiddleware, adminMiddleware, createJob); // sirf admin/HR job create karega
router.put("/:id", authMiddleware, adminMiddleware, updateJob);
router.delete("/:id", authMiddleware, adminMiddleware, deleteJob);

module.exports = router;
