
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  GraduationCap,
  CalendarDays,
  Users,
  ArrowRight,
  LogOut,
  ClipboardList,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  Clock3,
  XCircle,
  ShieldCheck,
  FolderCode,
  Code2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { getMyRegistration } from "../services/registrationService";

// Registration status configuration
const statusConfig = {
  submitted: {
    label: "Submitted",
    description: "Your registration has been submitted successfully.",
    icon: CheckCircle2,
    style: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
  pending: {
    label: "Pending Review",
    description: "Your registration is awaiting review.",
    icon: Clock3,
    style: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },
  under_review: {
    label: "Under Review",
    description: "Your hackathon entry is currently being reviewed.",
    icon: Clock3,
    style: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },
  accepted: {
    label: "Accepted",
    description: "Congratulations! Your entry has been accepted.",
    icon: CheckCircle2,
    style: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
  rejected: {
    label: "Not Selected",
    description: "Your entry was not selected this time.",
    icon: XCircle,
    style: "border-red-500/20 bg-red-500/10 text-red-400",
  },
};

// Reusable information component
const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="rounded-lg border border-white/10 bg-white/5 p-2">
      <Icon size={17} className="text-violet-400" />
    </div>

    <div className="min-w-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-gray-200">
        {value || "Not available"}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [registration, setRegistration] = useState(null);
  const [registrationLoading, setRegistrationLoading] = useState(true);
  const [registrationError, setRegistrationError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  // Fetch participant registration
  const fetchRegistration = useCallback(async () => {
    try {
      setRegistrationLoading(true);
      setRegistrationError("");

      const response = await getMyRegistration();

      if (!response.success) {
        throw new Error(
          response.message || "Unable to fetch registration."
        );
      }

      setRegistration(response.registration || null);
    } catch (error) {
      setRegistrationError(
        error.response?.data?.message ||
          error.message ||
          "Unable to load your registration details."
      );
    } finally {
      setRegistrationLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistration();
  }, [fetchRegistration]);

  // Logout using existing AuthContext
  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      setLogoutError("");

      await logout();

      navigate("/login", { replace: true });
    } catch (error) {
      setLogoutError(
        "Unable to complete logout. Please try again."
      );
      setLoggingOut(false);
    }
  };

  const displayName = user?.fullName || "Participant";
  const firstName = displayName.split(" ")[0];

  const status = registration
    ? statusConfig[registration.status] || statusConfig.submitted
    : null;

  const StatusIcon = status?.icon;

  return (
    <div className="relative isolate overflow-hidden bg-[#050816] text-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">

        {/* Welcome Section */}
        <section className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold tracking-widest text-violet-400">
              <Code2 size={14} />
              PARTICIPANT PORTAL
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {firstName}.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Manage your profile, track your hackathon registration,
              and keep your project information up to date.
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loggingOut ? (
              <RefreshCw size={17} className="animate-spin" />
            ) : (
              <LogOut size={17} />
            )}

            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </section>

        {logoutError && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400"
          >
            {logoutError}
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Profile Card */}
          <section className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl lg:col-span-1">

            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your Profile</h2>

              <div className="rounded-xl border border-violet-400/10 bg-violet-500/10 p-3">
                <UserRound size={20} className="text-violet-400" />
              </div>
            </div>

            {/* User Information */}
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold shadow-lg shadow-violet-900/30">
                {displayName.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <h3 className="truncate font-semibold text-white">
                  {displayName}
                </h3>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {user?.email}
                </p>

                <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Participant
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <InfoItem
                icon={UserRound}
                label="Full Name"
                value={user?.fullName}
              />

              <InfoItem
                icon={Mail}
                label="Email Address"
                value={user?.email}
              />

              <InfoItem
                icon={ShieldCheck}
                label="Account Status"
                value={user?.isVerified ? "Verified" : "Unverified"}
              />

              <InfoItem
                icon={CalendarDays}
                label="Account Created"
                value={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "Not available"
                }
              />
            </div>

            {/* Security Information */}
            <div className="mt-8 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                <ShieldCheck size={16} />
                Secure Account
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Your account is authenticated securely.
              </p>
            </div>
          </section>

          {/* Registration Section */}
          <section className="space-y-6 lg:col-span-2">

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">

              {/* Registration Header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-violet-400">
                    HACKATHON REGISTRATION
                  </p>

                  <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                    Your Registration
                  </h2>
                </div>

                <div className="rounded-xl border border-violet-400/10 bg-violet-500/10 p-3">
                  <ClipboardList
                    size={23}
                    className="text-violet-400"
                  />
                </div>
              </div>

              {/* Loading */}
              {registrationLoading ? (
                <div className="flex min-h-64 flex-col items-center justify-center">
                  <RefreshCw
                    size={30}
                    className="animate-spin text-violet-400"
                  />

                  <p className="mt-5 text-sm text-gray-400">
                    Checking your registration...
                  </p>
                </div>
              ) : registrationError ? (
                /* Error */
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                  <div className="flex items-center gap-3">
                    <XCircle className="text-red-400" size={22} />

                    <h3 className="font-semibold text-red-300">
                      Unable to load registration
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {registrationError}
                  </p>

                  <button
                    onClick={fetchRegistration}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition hover:text-violet-300"
                  >
                    <RefreshCw size={15} />
                    Try Again
                  </button>
                </div>
              ) : registration ? (
                /* Existing Registration */
                <div>

                  {/* Status */}
                  <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-400">
                        Registration Status
                      </p>

                      <div
                        className={`mt-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${status.style}`}
                      >
                        <StatusIcon size={16} />
                        {status.label}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        Submitted On
                      </p>

                      <p className="mt-2 text-sm text-gray-300">
                        {registration.createdAt
                          ? new Date(
                              registration.createdAt
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "Not available"}
                      </p>
                    </div>
                  </div>

                  <p className="mb-7 text-sm leading-6 text-gray-400">
                    {status.description}
                  </p>

                  {/* Project Details */}
                  <div className="rounded-xl border border-white/10 bg-[#0b1020]/80 p-5 sm:p-6">

                    <div className="mb-7 flex items-center gap-3">
                      <div className="rounded-xl bg-violet-500/10 p-3">
                        <FolderCode
                          size={21}
                          className="text-violet-400"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold tracking-widest text-gray-500">
                          YOUR PROJECT
                        </p>

                        <h3 className="mt-1 truncate font-semibold text-white">
                          {registration.projectName}
                        </h3>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <InfoItem
                        icon={GraduationCap}
                        label="College"
                        value={registration.collegeName}
                      />

                      <InfoItem
                        icon={Code2}
                        label="Domain / Track"
                        value={registration.domain}
                      />

                      <InfoItem
                        icon={Users}
                        label="Team Size"
                        value={
                          registration.teamSize
                            ? `${registration.teamSize} ${
                                Number(registration.teamSize) === 1
                                  ? "Member"
                                  : "Members"
                              }`
                            : "Not available"
                        }
                      />

                      <InfoItem
                        icon={ClipboardList}
                        label="Course"
                        value={registration.course}
                      />
                    </div>

                    {/* Team Members */}
                    {registration.teamMembers?.length > 0 && (
                      <div className="mt-8 border-t border-white/10 pt-6">
                        <h4 className="mb-5 flex items-center gap-2 text-sm font-semibold">
                          <Users size={17} className="text-violet-400" />
                          Team Members
                        </h4>

                        <div className="space-y-4">
                          {registration.teamMembers.map(
                            (member, index) => (
                              <div
                                key={`${member.email}-${index}`}
                                className="flex flex-col justify-between gap-1 rounded-lg bg-white/[0.03] p-3 sm:flex-row sm:items-center"
                              >
                                <span className="text-sm font-medium text-gray-300">
                                  {member.name}
                                </span>

                                <span className="break-all text-xs text-gray-500">
                                  {member.email}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Links */}
                  {(registration.pptLink ||
                    registration.prototypeLink) && (
                    <div className="mt-6 flex flex-wrap gap-3">

                      {registration.pptLink && (
                        <a
                          href={registration.pptLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-gray-300 transition hover:border-violet-400/30 hover:text-violet-400"
                        >
                          View Presentation
                          <ExternalLink size={15} />
                        </a>
                      )}

                      {registration.prototypeLink && (
                        <a
                          href={registration.prototypeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-gray-300 transition hover:border-cyan-400/30 hover:text-cyan-400"
                        >
                          View Prototype
                          <ExternalLink size={15} />
                        </a>
                      )}

                    </div>
                  )}

                </div>
              ) : (
                /* Not Registered */
                <div className="flex min-h-72 flex-col items-center justify-center py-10 text-center">

                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
                    <FolderCode
                      size={35}
                      className="text-violet-400"
                    />
                  </div>

                  <h3 className="text-xl font-bold sm:text-2xl">
                    Your Next Big Idea Starts Here.
                  </h3>

                  <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-400">
                    You haven't registered for the hackathon yet.
                    Submit your project details and team information
                    to complete your registration.
                  </p>

                  <button
                    onClick={() => navigate("/register")}
                    className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 text-sm font-semibold shadow-lg shadow-violet-900/30 transition hover:-translate-y-1 hover:shadow-violet-500/30"
                  >
                    Register for Hackathon

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                  <p className="mt-5 text-xs text-gray-500">
                    Keep your project details and team information ready.
                  </p>

                </div>
              )}
            </div>

            {/* Information Card */}
            <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-r from-violet-500/[0.08] to-indigo-500/[0.05] p-6">

              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl border border-violet-400/10 bg-violet-500/10 p-3">
                  <ShieldCheck
                    size={22}
                    className="text-violet-400"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Need Help With Your Registration?
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-400">
                    Make sure your project presentation and prototype
                    links are accessible. Use shareable links so the
                    review team can view your submissions.
                  </p>

                  <button
                    onClick={() => navigate("/contact")}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition hover:text-cyan-400"
                  >
                    Contact Support
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

          </section>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
