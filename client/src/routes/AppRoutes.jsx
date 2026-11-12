
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "../pages/Signup";
import Login from "../pages/Login";
import VerifyOTP from "../pages/VerifyOTP";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Future protected pages */}
        {/* <Route path="/hackathons" element={<Hackathons />} /> */}
        {/* <Route path="/register" element={<HackathonRegistration />} /> */}
      </Route>

      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to="/signup" replace />}
      />

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/signup" replace />}
      />

    </Routes>
  );
};

export default AppRoutes;
