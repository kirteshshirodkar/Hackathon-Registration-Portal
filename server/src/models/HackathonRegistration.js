
import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { _id: false }
);

const hackathonRegistrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    collegeName: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    branch: {
      type: String,
      required: true,
      trim: true,
    },

    yearOfStudy: {
      type: String,
      required: true,
      trim: true,
    },

    domain: {
      type: String,
      required: true,
      trim: true,
    },

    projectName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },

    pptLink: {
      type: String,
      required: true,
      trim: true,
    },

    prototypeLink: {
      type: String,
      required: true,
      trim: true,
    },

    demoVideoLink: {
      type: String,
      default: "",
      trim: true,
    },

    teamSize: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    teamMembers: {
      type: [teamMemberSchema],
      default: [],
    },

    status: {
      type: String,
      enum: [
        "submitted",
        "pending",
        "under_review",
        "accepted",
        "rejected",
      ],
      default: "submitted",
    },
  },
  {
    timestamps: true,
  }
);

// The number of additional members must equal teamSize - 1.
hackathonRegistrationSchema.pre("validate", function () {
  if (this.teamMembers.length !== this.teamSize - 1) {
    this.invalidate(
      "teamMembers",
      "The number of additional members must match the team size."
    );
  }
});

const HackathonRegistration = mongoose.model(
  "HackathonRegistration",
  hackathonRegistrationSchema
);

export default HackathonRegistration;
