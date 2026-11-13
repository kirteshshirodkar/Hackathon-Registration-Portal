
import express from "express";

import {
  createRegistration,
  getMyRegistration,
} from "../controllers/registrationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validateRegistration } from "../middleware/validateRegistration.js";

const router = express.Router();

// All registration routes require authentication.
router.use(protect);

// Submit registration.
router.post("/", validateRegistration, createRegistration);

// Get logged-in user's registration.
router.get("/me", getMyRegistration);

export default router;
