
import { registrationSchema } from "../validations/registrationValidation.js";

export const validateRegistration = (req, res, next) => {
  const result = registrationSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Registration validation failed.",
      errors,
    });
  }

  // Only validated and parsed fields reach the controller.
  req.validatedBody = result.data;

  next();
};
