
import express from "express";

import {
  signup,
  verifyOTP,
  resendOTP,
  login,
  logout,
} from "../controllers/authController.js";

import {
  authLimiter,
  otpLimiter,
} from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post("/signup", authLimiter, signup);

router.post("/verify-otp", otpLimiter, verifyOTP);

router.post("/resend-otp", otpLimiter, resendOTP);

router.post("/login", authLimiter, login);

router.post("/logout", logout);

export default router;
