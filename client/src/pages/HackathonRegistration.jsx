
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  UserRound,
  GraduationCap,
  Users,
  FolderCode,
  Link2,
  Plus,
  Trash2,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { submitRegistration } from "../services/registrationService";

// Replace these examples with your official approved college list.
const COLLEGES = [
  "Garden City University",
  "Don Bosco College",
  "Goa University",
  "National Institute of Technology Goa",
  "Indian Institute of Technology Goa",
  "Other",
];

const COURSES = [
  "B.Tech",
  "M.Tech",
  "BCA",
  "MCA",
  "BSc",
  "MSc",
  "BE",
  "ME",
  "Other",
];

const BRANCHES = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "ME",
  "CE",
  "AI & ML",
  "Data Science",
  "Cyber Security",
  "Other",
];

const YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
];

const DOMAINS = [
  "AI/ML",
  "Web Development",
  "IoT",
  "Cyber Security",
  "Blockchain",
  "Data Science",
  "Cloud Computing",
  "Other",
];

const initialFormData = {
  mobileNumber: "",
  collegeName: "",
  customCollege: "",
  course: "",
  branch: "",
  yearOfStudy: "",
  domain: "",
  projectName: "",
  pptLink: "",
  prototypeLink: "",
  demoVideoLink: "",
  teamSize: "1",
  teamMembers: [],
};

const nameRegex = /^[\p{L}\s]+$/u;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = true,
  error,
  readOnly = false,
  maxLength,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-300">
      {label}
      {required && <span className="ml-1 text-violet-400">*</span>}
      {!required && (
        <span className="ml-2 text-xs text-gray-500">(Optional)</span>
      )}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      maxLength={maxLength}
      className={`w-full rounded-xl border ${
        error
          ? "border-red-500/50"
          : "border-white/10"
      } ${
        readOnly
          ? "cursor-not-allowed bg-white/[0.03] text-gray-400"
          : "bg-[#0b1020] text-white"
      } px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20`}
    />

    {error && (
      <p className="mt-1.5 text-xs text-red-400">{error}</p>
    )}
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-300">
      {label}
      <span className="ml-1 text-violet-400">*</span>
    </label>

    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className={`w-full rounded-xl border ${
        error ? "border-red-500/50" : "border-white/10"
      } bg-[#0b1020] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20`}
    >
      <option value="">Select {label.toLowerCase()}</option>

      {options.map((option) => (
        <option key={option} value={option} className="bg-[#0b1020]">
          {option}
        </option>
      ))}
    </select>

    {error && (
      <p className="mt-1.5 text-xs text-red-400">{error}</p>
    )}
  </div>
);

const SectionHeading = ({ icon: Icon, title, description }) => (
  <div className="mb-6 flex items-start gap-3">
    <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 p-2.5">
      <Icon size={20} className="text-violet-400" />
    </div>

    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-gray-500">
        {description}
      </p>
    </div>
  </div>
);

const HackathonRegistration = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setSubmitError("");
  };

  const handleTeamSizeChange = (e) => {
    const size = Number(e.target.value);

    setFormData((prev) => {
      const requiredMembers = size - 1;

      const teamMembers = Array.from(
        { length: requiredMembers },
        (_, index) =>
          prev.teamMembers[index] || {
            name: "",
            email: "",
          }
      );

      return {
        ...prev,
        teamSize: String(size),
        teamMembers,
      };
    });

    setErrors((prev) => ({
      ...prev,
      teamSize: "",
      teamMembers: "",
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedMembers = [...prev.teamMembers];

      updatedMembers[index] = {
        ...updatedMembers[index],
        [field]: value,
      };

      return {
        ...prev,
        teamMembers: updatedMembers,
      };
    });

    setErrors((prev) => ({
      ...prev,
      [`teamMembers.${index}.${field}`]: "",
      teamMembers: "",
    }));

    setSubmitError("");
  };

  const validateForm = () => {
    const newErrors = {};

    // Authenticated user details
    if (!user?.fullName || user.fullName.trim().length < 3) {
      newErrors.fullName = "Your account name is invalid.";
    } else if (!nameRegex.test(user.fullName.trim())) {
      newErrors.fullName = "Your account name must contain letters only.";
    }

    if (!user?.email || !emailRegex.test(user.email)) {
      newErrors.email = "Your account email is invalid.";
    }

    // Mobile
    if (!mobileRegex.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber =
        "Enter a valid 10-digit Indian mobile number.";
    }

    // College
    const collegeName =
      formData.collegeName === "Other"
        ? formData.customCollege.trim()
        : formData.collegeName.trim();

    if (!collegeName || collegeName.length < 2) {
      newErrors.collegeName = "Please select or enter your college.";
    }

    // Dropdowns
    if (!COURSES.includes(formData.course)) {
      newErrors.course = "Please select a valid course.";
    }

    if (!BRANCHES.includes(formData.branch)) {
      newErrors.branch = "Please select a valid branch.";
    }

    if (!YEARS.includes(formData.yearOfStudy)) {
      newErrors.yearOfStudy = "Please select your year of study.";
    }

    if (!DOMAINS.includes(formData.domain)) {
      newErrors.domain = "Please select a valid domain.";
    }

    // Project
    if (formData.projectName.trim().length < 5) {
      newErrors.projectName =
        "Project name must contain at least 5 characters.";
    }

    // Links
    if (!isValidUrl(formData.pptLink.trim())) {
      newErrors.pptLink = "Enter a valid PPT shareable URL.";
    }

    if (!isValidUrl(formData.prototypeLink.trim())) {
      newErrors.prototypeLink = "Enter a valid prototype URL.";
    }

    if (
      formData.demoVideoLink.trim() &&
      !isValidUrl(formData.demoVideoLink.trim())
    ) {
      newErrors.demoVideoLink = "Enter a valid demo video URL.";
    }

    // Team size
    const teamSize = Number(formData.teamSize);

    if (!Number.isInteger(teamSize) || teamSize < 1 || teamSize > 5) {
      newErrors.teamSize = "Team size must be between 1 and 5.";
    }

    // Team members
    if (formData.teamMembers.length !== teamSize - 1) {
      newErrors.teamMembers =
        "The number of team members does not match the team size.";
    }

    const memberEmails = [];

    formData.teamMembers.forEach((member, index) => {
      const name = member.name.trim();
      const email = member.email.trim().toLowerCase();

      if (name.length < 3 || !nameRegex.test(name)) {
        newErrors[`teamMembers.${index}.name`] =
          "Enter a valid name (minimum 3 letters).";
      }

      if (!emailRegex.test(email)) {
        newErrors[`teamMembers.${index}.email`] =
          "Enter a valid email address.";
      }

      if (email) {
        memberEmails.push(email);
      }

      if (user?.email && email === user.email.toLowerCase()) {
        newErrors[`teamMembers.${index}.email`] =
          "You cannot add your own email as a team member.";
      }
    });

    if (new Set(memberEmails).size !== memberEmails.length) {
      newErrors.teamMembers =
        "Duplicate team member email addresses are not allowed.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitError("");

    if (!validateForm()) {
      setSubmitError("Please correct the highlighted fields.");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const registrationData = {
      mobileNumber: formData.mobileNumber.trim(),
      collegeName:
        formData.collegeName === "Other"
          ? formData.customCollege.trim()
          : formData.collegeName.trim(),
      course: formData.course,
      branch: formData.branch,
      yearOfStudy: formData.yearOfStudy,
      domain: formData.domain,
      projectName: formData.projectName.trim(),
      pptLink: formData.pptLink.trim(),
      prototypeLink: formData.prototypeLink.trim(),
      demoVideoLink: formData.demoVideoLink.trim(),
      teamSize: Number(formData.teamSize),
      teamMembers: formData.teamMembers.map((member) => ({
        name: member.name.trim(),
        email: member.email.trim().toLowerCase(),
      })),
    };

    try {
      setLoading(true);

      await submitRegistration(registrationData);

      navigate("/dashboard", {
        replace: true,
        state: {
          registrationSuccess: true,
        },
      });
    } catch (error) {
      const status = error.response?.status;
      const responseData = error.response?.data;

      if (status === 409) {
        setSubmitError(
          responseData?.message ||
            "You have already registered for this hackathon."
        );
      } else if (status === 400 && responseData?.errors) {
        const backendErrors = {};

        responseData.errors.forEach((item) => {
          backendErrors[item.field] = item.message;
        });

        setErrors((prev) => ({
          ...prev,
          ...backendErrors,
        }));

        setSubmitError("Please correct the highlighted fields.");
      } else {
        setSubmitError(
          responseData?.message ||
            "Unable to submit your registration. Please try again."
        );
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="pointer-events-none fixed -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Navbar */}
      <header className="relative z-10 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <Code2 size={22} className="text-violet-400" />
            </div>

            <div>
              <h1 className="font-bold">
                Hack<span className="text-violet-400">Portal</span>
              </h1>
              <p className="text-[10px] tracking-widest text-gray-500">
                PARTICIPANT PORTAL
              </p>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-10 sm:px-8">

        {/* Page heading */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-violet-400">
            PARTICIPANT REGISTRATION
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Register for the{" "}
            <span className="text-violet-400">Hackathon.</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
            Tell us about yourself, your project and your team.
            Complete all required details to submit your registration.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            Fields marked with * are mandatory.
          </div>
        </div>

        {/* Error summary */}
        {submitError && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0 text-red-400"
            />
            <p className="text-sm text-red-300">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Participant details */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
            <SectionHeading
              icon={UserRound}
              title="Participant Information"
              description="Your name and email are taken from your verified account."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="Full Name"
                name="fullName"
                value={user?.fullName || ""}
                placeholder="Your full name"
                readOnly
                error={errors.fullName}
              />

              <InputField
                label="Email Address"
                name="email"
                value={user?.email || ""}
                placeholder="Your registered email"
                type="email"
                readOnly
                error={errors.email}
              />

              <InputField
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  handleChange({
                    target: {
                      name: "mobileNumber",
                      value,
                    },
                  });
                }}
                placeholder="10-digit mobile number"
                type="tel"
                maxLength={10}
                error={errors.mobileNumber}
              />
            </div>
          </section>

          {/* Academic details */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
            <SectionHeading
              icon={GraduationCap}
              title="Academic Information"
              description="Provide your current college and academic details."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <SelectField
                  label="College Name"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  options={COLLEGES}
                  error={errors.collegeName}
                />

                {formData.collegeName === "Other" && (
                  <input
                    type="text"
                    name="customCollege"
                    value={formData.customCollege}
                    onChange={handleChange}
                    placeholder="Enter your college name"
                    className="mt-3 w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500"
                  />
                )}
              </div>

              <SelectField
                label="Course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                options={COURSES}
                error={errors.course}
              />

              <SelectField
                label="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                options={BRANCHES}
                error={errors.branch}
              />

              <SelectField
                label="Year of Study"
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                options={YEARS}
                error={errors.yearOfStudy}
              />
            </div>
          </section>

          {/* Project details */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
            <SectionHeading
              icon={FolderCode}
              title="Project Information"
              description="Share your project details and submission links."
            />

            <div className="space-y-5">
              <SelectField
                label="Domain / Track"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                options={DOMAINS}
                error={errors.domain}
              />

              <InputField
                label="Project Name"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter your project name"
                error={errors.projectName}
              />

              <InputField
                label="PPT Link"
                name="pptLink"
                value={formData.pptLink}
                onChange={handleChange}
                placeholder="https://drive.google.com/..."
                type="url"
                error={errors.pptLink}
              />

              <InputField
                label="Prototype Link"
                name="prototypeLink"
                value={formData.prototypeLink}
                onChange={handleChange}
                placeholder="https://github.com/... or https://..."
                type="url"
                error={errors.prototypeLink}
              />

              <InputField
                label="Demo Video Link"
                name="demoVideoLink"
                value={formData.demoVideoLink}
                onChange={handleChange}
                placeholder="https://youtube.com/... (optional)"
                type="url"
                required={false}
                error={errors.demoVideoLink}
              />
            </div>
          </section>

          {/* Team details */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
            <SectionHeading
              icon={Users}
              title="Team Information"
              description="Choose your team size and add the details of your teammates."
            />

            <div className="max-w-xs">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Team Size <span className="text-violet-400">*</span>
              </label>

              <select
                name="teamSize"
                value={formData.teamSize}
                onChange={handleTeamSizeChange}
                className="w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              >
                {[1, 2, 3, 4, 5].map((size) => (
                  <option
                    key={size}
                    value={size}
                    className="bg-[#0b1020]"
                  >
                    {size} {size === 1 ? "Member" : "Members"}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-gray-500">
                The team size includes you as the main participant.
              </p>

              {errors.teamSize && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.teamSize}
                </p>
              )}
            </div>

            {/* Dynamic team members */}
            {formData.teamMembers.length > 0 ? (
              <div className="mt-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-gray-200">
                    Additional Team Members
                  </h4>

                  <span className="text-xs text-violet-400">
                    {formData.teamMembers.length} additional{" "}
                    {formData.teamMembers.length === 1
                      ? "member"
                      : "members"}
                  </span>
                </div>

                {formData.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-[#0b1020] p-5"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-xs font-bold text-violet-400">
                          {index + 2}
                        </div>

                        <h5 className="text-sm font-semibold">
                          Team Member {index + 1}
                        </h5>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const newSize = Number(formData.teamSize) - 1;

                          setFormData((prev) => ({
                            ...prev,
                            teamSize: String(newSize),
                            teamMembers: prev.teamMembers.filter(
                              (_, memberIndex) => memberIndex !== index
                            ),
                          }));

                          setErrors({});
                        }}
                        className="flex items-center gap-1 text-xs text-red-400 transition hover:text-red-300"
                        aria-label={`Remove team member ${index + 1}`}
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField
                        label="Member Name"
                        name={`member-${index}-name`}
                        value={member.name}
                        onChange={(e) =>
                          handleTeamMemberChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Enter member name"
                        error={errors[`teamMembers.${index}.name`]}
                      />

                      <InputField
                        label="Member Email"
                        name={`member-${index}-email`}
                        value={member.email}
                        onChange={(e) =>
                          handleTeamMemberChange(
                            index,
                            "email",
                            e.target.value
                          )
                        }
                        placeholder="member@example.com"
                        type="email"
                        error={errors[`teamMembers.${index}.email`]}
                      />
                    </div>
                  </div>
                ))}

                {errors.teamMembers && (
                  <p className="text-xs text-red-400">
                    {errors.teamMembers}
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center">
                <Users
                  size={26}
                  className="mx-auto text-gray-500"
                />
                <p className="mt-3 text-sm font-medium text-gray-300">
                  You're registering as an individual.
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Select a larger team size to add teammates.
                </p>
              </div>
            )}
          </section>

          {/* Confirmation */}
          <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <p className="text-xs leading-6 text-gray-400">
                By submitting this form, you confirm that the
                information provided is accurate and that your
                presentation and prototype links are accessible
                to the hackathon review team.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-gray-300 transition hover:bg-white/5"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Submitting Registration...
                </>
              ) : (
                <>
                  Submit Registration
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        <footer className="mt-12 border-t border-white/10 py-6 text-center text-xs text-gray-600">
          HackPortal · Hackathon Registration Portal
        </footer>
      </main>
    </div>
  );
};

export default HackathonRegistration;
