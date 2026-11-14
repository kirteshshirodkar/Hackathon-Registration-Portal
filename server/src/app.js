
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());

app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Code-a-Nova API is running!",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

//User Route
app.use("/api/user", userRoutes);

//Registration Route
app.use("/api/registrations", registrationRoutes);

//Contact Route
app.use("/api/contact", contactRoutes);

export default app;
