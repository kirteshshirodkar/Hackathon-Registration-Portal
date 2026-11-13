
import User from "../models/User.js";
import HackathonRegistration from "../models/HackathonRegistration.js";
import {
  sendRegistrationConfirmation,
} from "../services/emailService.js";

// POST /api/registrations

export const createRegistration = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select(
      "fullName email isVerified"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before registering.",
      });
    }

    const existingRegistration =
      await HackathonRegistration.findOne({ userId });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: "You have already registered for this hackathon.",
      });
    }

    const registrationData = req.validatedBody;

    const hasOwnEmail = registrationData.teamMembers.some(
      (member) =>
        member.email.toLowerCase() === user.email.toLowerCase()
    );

    if (hasOwnEmail) {
      return res.status(400).json({
        success: false,
        message: "You cannot add your own email as a team member.",
      });
    }

    // Save registration first.
    const registration = await HackathonRegistration.create({
      ...registrationData,
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
    });

    // Send confirmation email separately.
    let emailSent = false;

    try {
      await sendRegistrationConfirmation(registration);
      emailSent = true;
    } catch (emailError) {
      console.error(
        "Registration confirmation email failed:",
        emailError
      );
    }

    return res.status(201).json({
      success: true,
      message: emailSent
        ? "Registration submitted successfully. Confirmation email sent."
        : "Registration submitted successfully, but confirmation email could not be sent.",
      emailSent,
      registration,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already registered for this hackathon.",
      });
    }

    console.error("Create registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit registration. Please try again.",
    });
  }
};


// GET /api/registrations/me
export const getMyRegistration = async (req, res) => {
  try {
    const registration = await HackathonRegistration.findOne({
      userId: req.userId,
    }).populate("userId", "fullName email");

    return res.status(200).json({
      success: true,
      registration: registration || null,
    });
  } catch (error) {
    console.error("Get registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve registration details.",
    });
  }
};
