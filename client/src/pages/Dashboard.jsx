
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code2,
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
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { getMyRegistration } from "../services/registrationService";

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

  const fetchRegistration = async () => {
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
  };

  useEffect(() => {
    fetchRegistration();
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      setRegistrationError(
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
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none fixed -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Navbar */}
      <header className="relative z-10 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <Code2 className="text-violet-400" size={22} />
            </div>

            <div>
              <h1 className="font-bold tracking-wide">
                Hack<span className="text-violet-400">Portal</span>
              </h1>
              <p className="text-[10px] tracking-widest text-gray-500">
                PARTICIPANT DASHBOARD
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
          >
            {loggingOut ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <LogOut size={16} />
            )}
            <span className="hidden sm:inline">
              {loggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* Welcome section */}
        <section className="mb-9">
          <p className="mb-2 text-sm font-medium text-violet-400">
            PARTICIPANT PORTAL
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back,{" "}
            <span className="text-violet-400">{firstName}.</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Manage your profile, track your hackathon registration,
            and keep your project information up to date.
          </p>
        </section>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Profile */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl lg:col-span-1">

            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-semibold">Your Profile</h3>

              <div className="rounded-lg bg-violet-500/10 p-2">
                <UserRound size={19} className="text-violet-400" />
              </div>
            </div>

            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <h4 className="truncate font-semibold">{displayName}</h4>
                <p className="truncate text-xs text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="space-y-5">
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

            <div className="mt-7 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck size={15} />
                Your account is authenticated securely.
              </div>
            </div>
          </section>

          {/* Registration area */}
          <section className="space-y-6 lg:col-span-2">

            {/* Registration status */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-violet-400">
                    HACKATHON REGISTRATION
                  </p>
                  <h3 className="mt-2 text-xl font-bold">
                    Your Registration
                  </h3>
                </div>

                <div className="rounded-xl bg-violet-500/10 p-3">
                  <ClipboardList
                    size={22}
                    className="text-violet-400"
                  />
                </div>
              </div>

              {registrationLoading ? (
                <div className="flex min-h-52 flex-col items-center justify-center">
                  <RefreshCw
                    size={28}
                    className="animate-spin text-violet-400"
                  />
                  <p className="mt-4 text-sm text-gray-400">
                    Checking your registration...
                  </p>
                </div>
              ) : registrationError ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                  <p className="text-sm text-red-300">
                    {registrationError}
                  </p>

                  <button
                    onClick={fetchRegistration}
                    className="mt-4 flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300"
                  >
                    <RefreshCw size={15} />
                    Try again
                  </button>
                </div>
              ) : registration ? (
                <div>
                  {/* Existing registration */}
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-400">
                        Registration status
                      </p>
                      <div
                        className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.style}`}
                      >
                        <StatusIcon size={15} />
                        {status.label}
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">
                      Submitted{" "}
                      {registration.createdAt
                        ? new Date(
                            registration.createdAt
                          ).toLocaleDateString("en-IN")
                        : ""}
                    </p>
                  </div>

                  <p className="mb-6 text-sm text-gray-400">
                    {status.description}
                  </p>

                  <div className="rounded-xl border border-white/10 bg-[#0b1020] p-5">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="rounded-lg bg-violet-500/10 p-2">
                        <FolderCode
                          size={20}
                          className="text-violet-400"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          YOUR PROJECT
                        </p>
                        <h4 className="mt-1 font-semibold">
                          {registration.projectName}
                        </h4>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
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
                        value={`${registration.teamSize} ${
                          Number(registration.teamSize) === 1
                            ? "Member"
                            : "Members"
                        }`}
                      />

                      <InfoItem
                        icon={ClipboardList}
                        label="Course"
                        value={registration.course}
                      />
                    </div>

                    {registration.teamMembers?.length > 0 && (
                      <div className="mt-6 border-t border-white/10 pt-5">
                        <h5 className="mb-3 text-sm font-semibold">
                          Team Members
                        </h5>

                        <div className="space-y-3">
                          {registration.teamMembers.map(
                            (member, index) => (
                              <div
                                key={`${member.email}-${index}`}
                                className="flex items-center justify-between gap-3 text-sm"
                              >
                                <span className="text-gray-300">
                                  {member.name}
                                </span>
                                <span className="truncate text-xs text-gray-500">
                                  {member.email}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {registration.pptLink && (
                      <a
                        href={registration.pptLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-white/5"
                      >
                        View PPT <ExternalLink size={14} />
                      </a>
                    )}

                    {registration.prototypeLink && (
                      <a
                        href={registration.prototypeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-white/5"
                      >
                        View Prototype <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                /* Not registered */
                <div className="py-8 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
                    <FolderCode
                      size={30}
                      className="text-violet-400"
                    />
                  </div>

                  <h4 className="text-xl font-semibold">
                    Your next big idea starts here.
                  </h4>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">
                    You haven't registered for the hackathon yet.
                    Submit your project details and team information
                    to complete your registration.
                  </p>

                  <button
                    onClick={() =>
                      navigate("/register")
                    }
                    className="mx-auto mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-indigo-500"
                  >
                    Register for Hackathon
                    <ArrowRight size={18} />
                  </button>

                  <p className="mt-4 text-xs text-gray-500">
                    Keep your project details and team information ready.
                  </p>
                </div>
              )}
            </div>

            {/* Information card */}
            <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-r from-violet-500/[0.08] to-indigo-500/[0.05] p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-violet-500/10 p-3">
                  <ShieldCheck
                    size={22}
                    className="text-violet-400"
                  />
                </div>

                <div>
                  <h4 className="font-semibold">
                    Need help with your registration?
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Make sure your project presentation and prototype
                    links are accessible. Use shareable links so the
                    review team can view your submissions.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-12 border-t border-white/10 py-6 text-center text-xs text-gray-600">
          HackPortal · Hackathon Registration Portal
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
