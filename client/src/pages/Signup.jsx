
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";
import { signupUser } from "../services/authService";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function validateForm(form) {
  const errors = {};

  const name = form.fullName.trim();
  const email = form.email.trim();

  if (!name) {
    errors.fullName = "Full name is required.";
  } else if (name.length < 3 || !/^[A-Za-z ]+$/.test(name)) {
    errors.fullName = "Enter a valid name (letters and spaces only).";
  }

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.password) {
    errors.password = "Password is required.";
  } else if (form.password.length < 8) {
    errors.password = "Password must contain at least 8 characters.";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const response = await signupUser({
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.success) {
        navigate("/verify-otp", {
          state: {
            email: response.email || formData.email.trim().toLowerCase(),
          },
        });
      } else {
        setServerError(response.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 409) {
        setServerError(message || "An account with this email already exists.");
      } else if (status === 503) {
        setServerError(
          message || "OTP delivery failed. Please try again later."
        );
      } else if (status === 400) {
        setServerError(message || "Please check your submitted information.");
      } else if (!error.response) {
        setServerError(
          "Unable to connect to the server. Please check your connection."
        );
      } else {
        setServerError(message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-[#0b1020] border ${
      errors[field]
        ? "border-red-500/70"
        : "border-white/[0.08] focus:border-violet-500/70"
    } rounded-xl py-3.5 pl-11 pr-12 text-sm text-white placeholder:text-gray-600 outline-none transition-all duration-300 focus:ring-2 focus:ring-violet-500/10`;

  const renderError = (field) =>
    errors[field] ? (
      <p className="mt-1.5 text-xs text-red-400">{errors[field]}</p>
    ) : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-700/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

      {/* Main container */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-10 sm:px-8 lg:px-12">

        <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left section */}
          <div className="hidden lg:block">

            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 shadow-[0_0_25px_rgba(139,92,246,0.2)]">
                <Code2 className="h-6 w-6 text-violet-300" />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Code-a-Nova
                </h2>
                <p className="text-[10px] tracking-[0.25em] text-gray-500">
                  INNOVATE. BUILD. COMPETE.
                </p>
              </div>
            </Link>

            {/* Hero */}
            <div className="mt-20">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-4 py-2 text-xs text-violet-300">
                <Sparkles size={14} />
                Your next big idea starts here
              </div>

              <h1 className="max-w-xl text-5xl font-bold leading-[1.15] tracking-tight xl:text-6xl">
                Build something
                <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  extraordinary.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-8 text-gray-400">
                Join a community of innovators, developers and problem
                solvers. Turn your ideas into reality through collaboration
                and competition.
              </p>

              {/* Feature cards */}
              <div className="mt-12 space-y-4">

                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="rounded-xl bg-violet-500/15 p-3">
                    <Zap className="h-5 w-5 text-violet-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Build without limits</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Transform your ideas into working projects.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="rounded-xl bg-cyan-500/15 p-3">
                    <Sparkles className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Connect with innovators</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Collaborate, compete and learn together.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <p className="mt-20 text-xs text-gray-600">
              © 2026 Code-a-Nova. All rights reserved.
            </p>
          </div>

          {/* Right section - Signup form */}
          <div className="mx-auto w-full max-w-md">

            {/* Mobile logo */}
            <Link to="/" className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <div className="rounded-xl border border-violet-400/30 bg-violet-500/15 p-2.5">
                <Code2 className="h-6 w-6 text-violet-300" />
              </div>
              <span className="text-xl font-bold">Code-a-Nova</span>
            </Link>

            <div className="rounded-3xl border border-white/[0.09] bg-[#0b1020]/90 p-6 shadow-[0_0_60px_rgba(109,40,217,0.10)] backdrop-blur-2xl sm:p-9">

              {/* Form heading */}
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
                  <Sparkles className="h-6 w-6 text-violet-300" />
                </div>

                <h2 className="text-3xl font-bold tracking-tight">
                  Create account
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Start your journey. It only takes a minute.
                </p>
              </div>

              {/* Server error */}
              {serverError && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-300"
                >
                  {serverError}
                </div>
              )}

              {/* Signup form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Full name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full name
                  </label>

                  <div className="relative">
                    <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className={inputClass("fullName")}
                      disabled={loading}
                    />
                  </div>

                  {renderError("fullName")}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={inputClass("email")}
                      disabled={loading}
                    />
                  </div>

                  {renderError("email")}
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                      className={inputClass("password")}
                      disabled={loading}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-violet-300"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {renderError("password")}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className={inputClass("confirmPassword")}
                      disabled={loading}
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-violet-300"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {renderError("confirmPassword")}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(124,58,237,0.4)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

              </form>

              {/* Login link */}
              <div className="mt-7 border-t border-white/[0.07] pt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-violet-400 transition hover:text-violet-300"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

            </div>

            <p className="mt-6 text-center text-xs text-gray-600">
              Secure registration · Email verification required
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
