const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ===== BASIC AUTH FIELDS =====
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // ===== USER PROFILE DETAILS =====
    profile: {
      fullName: { type: String },
      address: { type: String },
      phone: { type: String },
      dob: { type: String }, // ✅ Date of Birth
      education: { type: String },
      degree: { type: String },
      yearCompleted: { type: String },
      projects: { type: String }, // ✅ Simplified to match frontend
      skills: { type: String },
      certifications: { type: String },
      positionApplied: { type: String }, // ✅ Still useful for jobs
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
