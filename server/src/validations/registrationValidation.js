
import { z } from "zod";

const nameRegex = /^[\p{L}\s]+$/u;
const mobileRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validUrl = z
  .string()
  .trim()
  .url("Please enter a valid URL.")
  .refine((value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "URL must start with http:// or https://.");

const teamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Member name must contain at least 3 characters.")
    .regex(nameRegex, "Member name can contain only letters and spaces."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(emailRegex, "Enter a valid team member email."),
});

export const registrationSchema = z
  .object({
    mobileNumber: z
      .string()
      .trim()
      .regex(mobileRegex, "Enter a valid 10-digit Indian mobile number."),

    collegeName: z
      .string()
      .trim()
      .min(2, "Please select your college."),

    course: z.enum([
      "B.Tech",
      "M.Tech",
      "BCA",
      "MCA",
      "BSc",
      "MSc",
      "BE",
      "ME",
      "Other",
    ]),

    branch: z.enum([
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
    ]),

    yearOfStudy: z.enum([
      "1st Year",
      "2nd Year",
      "3rd Year",
      "4th Year",
    ]),

    domain: z.enum([
      "AI/ML",
      "Web Development",
      "IoT",
      "Cyber Security",
      "Blockchain",
      "Data Science",
      "Cloud Computing",
      "Other",
    ]),

    projectName: z
      .string()
      .trim()
      .min(5, "Project name must contain at least 5 characters."),

    pptLink: validUrl,

    prototypeLink: validUrl,

    demoVideoLink: z.union([
      z.literal(""),
      validUrl,
    ]).optional().default(""),

    teamSize: z.coerce.number().int().min(1).max(5),

    teamMembers: z.array(teamMemberSchema),
  })
  .superRefine((data, ctx) => {
    if (data.teamMembers.length !== data.teamSize - 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["teamMembers"],
        message: `A team of ${data.teamSize} must have ${
          data.teamSize - 1
        } additional team member(s).`,
      });
    }

    const emails = data.teamMembers.map((member) =>
      member.email.toLowerCase()
    );

    if (new Set(emails).size !== emails.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["teamMembers"],
        message: "Duplicate team member email addresses are not allowed.",
      });
    }
  });
