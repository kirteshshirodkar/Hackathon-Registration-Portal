
import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";

// Authentication Pages
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import VerifyOTP from "../pages/VerifyOTP";

// Dashboard Pages
import Dashboard from "../pages/Dashboard";
import HackathonRegistration from "../pages/HackathonRegistration";

// Layouts
import MainLayout from "../components/layouts/MainLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";

// Route Protection
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Authentication */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />

      {/* Protected Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<HackathonRegistration />} />
        </Route>
      </Route>

      {/* Unknown Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;
