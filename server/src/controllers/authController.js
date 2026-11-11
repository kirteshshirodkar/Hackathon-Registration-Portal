
import bcrypt from "bcrypt";
import User from "../models/User.js";

import {
  generateOTP,
  hashOTP,
  getOTPExpiry,
} from "../services/otpService.js";

import { sendOTPEmail } from "../services/emailService.js";

import {
  generateToken,
  setTokenCookie,
} from "../utils/generateToken.js";

// ================= SIGNUP =================

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (fullName.trim().length < 3 ||
        !/^[\p{L}\s]+$/u.test(fullName.trim())) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid full name",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: existingUser.isVerified
          ? "Email is already registered"
          : "Account exists but is not verified. Please request a new OTP.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const otp = generateOTP();

    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      isVerified: false,
      otpHash: hashOTP(otp),
      otpExpiresAt: getOTPExpiry(),
      otpAttempts: 0,
      otpLastSentAt: new Date(),
    });

    try {
      await sendOTPEmail(normalizedEmail, otp);
    } catch (emailError) {
      await User.findByIdAndDelete(user._id);

      console.error("OTP email failed:", emailError.message);

      return res.status(503).json({
        success: false,
        message: "Unable to send verification email. Please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Account created. OTP sent to your email.",
      email: normalizedEmail,
    });

  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during signup",
    });
  }
};


// ================= VERIFY OTP =================

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "OTP must contain exactly 6 digits",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid verification request",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account is already verified",
      });
    }

    if (!user.otpHash || !user.otpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "Please request a new OTP",
      });
    }

    if (user.otpExpiresAt.getTime() <= Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new OTP.",
      });
    }

    if (user.otpAttempts >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many attempts. Please request a new OTP.",
      });
    }

    if (hashOTP(otp) !== user.otpHash) {
      user.otpAttempts += 1;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
        attemptsRemaining: 5 - user.otpAttempts,
      });
    }

    user.isVerified = true;
    user.otpHash = null;
    user.otpExpiresAt = null;
    user.otpAttempts = 0;
    user.otpLastSentAt = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. Please login.",
    });

  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during OTP verification",
    });
  }
};


// ================= RESEND OTP =================

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user || user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "If the account requires verification, an OTP will be sent.",
      });
    }

    // 60-second resend cooldown
    if (
      user.otpLastSentAt &&
      Date.now() - user.otpLastSentAt.getTime() < 60000
    ) {
      return res.status(429).json({
        success: false,
        message: "Please wait before requesting another OTP.",
      });
    }

    const otp = generateOTP();

    user.otpHash = hashOTP(otp);
    user.otpExpiresAt = getOTPExpiry();
    user.otpAttempts = 0;
    user.otpLastSentAt = new Date();

    await user.save();

    try {
      await sendOTPEmail(user.email, otp);
    } catch (emailError) {
      user.otpHash = null;
      user.otpExpiresAt = null;
      await user.save();

      console.error("Resend email failed:", emailError.message);

      return res.status(503).json({
        success: false,
        message: "Unable to send OTP. Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "A new OTP has been sent to your email.",
    });

  } catch (error) {
    console.error("Resend OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while resending OTP",
    });
  }
};


// ================= LOGIN =================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    setTokenCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};


// ================= LOGOUT =================

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
