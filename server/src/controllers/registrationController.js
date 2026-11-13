
import User from "../models/User.js";
import HackathonRegistration from "../models/HackathonRegistration.js";

// POST /api/registrations
export const createRegistration = async (req, res) => {
  try {
    const userId = req.userId;

    // Find the authenticated user.
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

    // Check if the user has already registered.
    const existingRegistration =
      await HackathonRegistration.findOne({ userId });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: "You have already registered for this hackathon.",
      });
    }

    const registrationData = req.validatedBody;

    // Prevent the participant from being added as their own team member.
    const participantEmail = user.email.toLowerCase();

    const hasOwnEmail = registrationData.teamMembers.some(
      (member) =>
        member.email.toLowerCase() === participantEmail
    );

    if (hasOwnEmail) {
      return res.status(400).json({
        success: false,
        message: "You cannot add your own email as a team member.",
      });
    }

    // Create registration using authenticated account details.
    const registration = await HackathonRegistration.create({
      ...registrationData,
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
    });

    return res.status(201).json({
      success: true,
      message: "Hackathon registration submitted successfully.",
      registration,
    });
  } catch (error) {
    // Handle duplicate registration caused by concurrent requests.
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
