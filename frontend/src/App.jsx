/*eslint-disable no-unused-vars */
import { Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/user/Dashboard";
import CareerRecommendation from "./pages/CareerRecommendation";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminJobManagement from "./pages/admin/AdminJobManagement";
import ManageUsers from "./pages/admin/ManageUsers";
import Application from "./pages/admin/Application";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ExploreCareers from "./pages/user/ExploreCareers";
import TrackProgress from "./pages/user/TrackProgress";
import Resources from "./pages/user/Resources";
import AIRecommendation from "./pages/user/AIRecommendation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Careers" element={<CareerRecommendation />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/admin/application"
          element={
            <AdminRoute>
              <Application />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-user"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <AdminRoute>
              <AdminJobManagement />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/user/explore-careers"
          element={
            <ProtectedRoute>
              <ExploreCareers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track-progress"
          element={
            <ProtectedRoute>
              <TrackProgress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/AIRecommendation"
          element={
            <ProtectedRoute>
              <AIRecommendation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
