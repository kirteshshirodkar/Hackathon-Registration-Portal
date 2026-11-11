
import transporter from "../config/mailer.js";

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"Code-a-Nova" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Code-a-Nova account",

    html: `
      <div style="font-family: Arial; padding: 25px;">
        <h2>Welcome to Code-a-Nova!</h2>

        <p>Thank you for registering.</p>

        <p>Your email verification OTP is:</p>

        <h1 style="letter-spacing: 8px; color: #6c63ff;">
          ${otp}
        </h1>

        <p>This OTP expires in 10 minutes.</p>

        <p>Please do not share this OTP with anyone.</p>

        <br />

        <strong>Code-a-Nova Team</strong>
      </div>
    `,
  });
};
