
import crypto from "crypto";

// Generate a secure 6-digit OTP
export const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// Hash OTP before storing in database
export const hashOTP = (otp) => {
  return crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");
};

// OTP expiry: 10 minutes
export const getOTPExpiry = () => {
  return new Date(Date.now() + 10 * 60 * 1000);
};
