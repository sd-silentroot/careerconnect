const mongoose = require("mongoose");
const connectDB = require("./config/db");
connectDB;
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorhandler = require("./middleware/errorHandler");
// Load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

////////////////////======ROUTES======///////////////////////////
// USER
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
app.use("/api/users", userRoutes);
// JOB
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);
//APPLICATION
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);
////////////////////////////////////////////////////////////////

// Test Route
app.get("/", (req, res) => {
  res.send("welcome sahil dhiman");
});
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend" });
});

app.use(errorHandler);

// Start servers
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/careerDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
