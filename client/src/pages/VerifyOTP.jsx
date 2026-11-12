
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Mail,
  ShieldCheck,
  ArrowRight,
  LoaderCircle,
  RefreshCw,
  Code2,
} from "lucide-react";

import {
  verifyOTP as verifyOTPRequest,
  resendOTP,
} from "../services/authService";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Countdown for OTP resend
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    setError("");
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your registered email address.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyOTPRequest({
        email: normalizedEmail,
        otp,
      });

      setMessage(
        response.message || "Email verified successfully."
      );

      // Backend verification does not log the user in.
      // Redirect to login after a short confirmation.
      navigate("/login", {
        replace: true,
        state: {
          message: "Email verified successfully. Please login.",
        },
      });
    } catch (err) {
      const status = err.response?.status;
      const serverMessage =
        err.response?.data?.message ||
        "OTP verification failed. Please try again.";

      if (status === 400) {
        setError(serverMessage);
      } else if (status === 404) {
        setError("No account found with this email address.");
      } else if (status === 429) {
        setError(serverMessage);
      } else {
        setError(serverMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your registered email address.");
      return;
    }

    try {
      setResending(true);
      setError("");
      setMessage("");

      const response = await resendOTP(normalizedEmail);

      setMessage(
        response.message || "A new OTP has been sent to your email."
      );

      setOtp("");
      setCountdown(60);
    } catch (err) {
      const status = err.response?.status;
      const serverMessage =
        err.response?.data?.message ||
        "Unable to resend OTP. Please try again.";

      if (status === 429) {
        setError(serverMessage);
      } else {
        setError(serverMessage);
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 py-12 text-white">

      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10">
            <Code2 className="h-7 w-7 text-violet-400" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Verify Your <span className="text-violet-400">Email</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            One final step before accessing your account.
          </p>
        </div>

        {/* OTP card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-violet-950/20 backdrop-blur-xl sm:p-8">

          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10">
              <Mail className="h-7 w-7 text-violet-400" />
            </div>

            <h2 className="text-xl font-semibold">
              Enter verification code
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              We've sent a 6-digit verification code to your email address.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
              {message}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-5">

            {/* Email field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Registered email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* OTP field */}
            <div>
              <label className="mb-3 block text-center text-sm font-medium text-gray-300">
                6-digit verification code
              </label>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={handleOTPChange}
                placeholder="000000"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-4 text-center text-3xl font-bold tracking-[0.65em] text-violet-300 outline-none transition placeholder:text-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />

              <p className="mt-2 text-center text-xs text-gray-500">
                Enter the code sent to your email.
              </p>
            </div>

            {/* Verify button */}
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-semibold shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Email
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Didn't receive the code?
            </p>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resending || countdown > 0}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {resending ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Sending...
                </>
              ) : countdown > 0 ? (
                `Resend OTP in ${countdown}s`
              ) : (
                <>
                  <RefreshCw size={15} />
                  Resend OTP
                </>
              )}
            </button>
          </div>

          <div className="my-6 h-px bg-white/10" />

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={15} className="text-emerald-400" />
            Secure email verification
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already verified?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
