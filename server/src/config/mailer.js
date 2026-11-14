
import "dotenv/config";
import nodemailer from "nodemailer";

console.log("Email configured:", Boolean(process.env.EMAIL_USER));
console.log("Password configured:", Boolean(process.env.EMAIL_PASS));
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;