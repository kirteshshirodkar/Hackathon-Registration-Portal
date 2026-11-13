
import transporter from "../config/mailer.js";

// Escape user-provided values before inserting them into HTML.
const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

// Existing OTP email function
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

// New registration confirmation email function
export const sendRegistrationConfirmation = async (registration) => {
  const {
    fullName,
    email,
    projectName,
    collegeName,
    domain,
    teamSize,
    createdAt,
  } = registration;

  const date = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  await transporter.sendMail({
    from: `"Code-a-Nova" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Code-a-Nova - Hackathon Registration Confirmed!",

    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:25px;background:#080b18;font-family:Arial,sans-serif;color:#ffffff;">

        <div style="max-width:600px;margin:auto;background:#11162a;border:1px solid #272d45;border-radius:14px;overflow:hidden;">

          <div style="padding:30px;text-align:center;background:linear-gradient(135deg,#5426a8,#3730a3);">
            <h1 style="margin:0;color:white;">Code-a-Nova</h1>
            <p style="color:#e0ddff;">HACKATHON REGISTRATION PORTAL</p>
          </div>

          <div style="padding:30px;">

            <h2 style="color:#6ee7b7;text-align:center;">
              &#10003; Registration Confirmed!
            </h2>

            <p>Hello ${escapeHtml(fullName)},</p>

            <p style="color:#cbd5e1;line-height:1.7;">
              Your hackathon registration has been successfully submitted.
              Thank you for participating in Code-a-Nova!
            </p>

            <div style="background:#0b1020;border:1px solid #272d45;border-radius:10px;padding:20px;margin-top:25px;">

              <h3 style="color:#a78bfa;">Registration Details</h3>

              <p><strong>Participant:</strong> ${escapeHtml(fullName)}</p>
              <p><strong>Project:</strong> ${escapeHtml(projectName)}</p>
              <p><strong>College:</strong> ${escapeHtml(collegeName)}</p>
              <p><strong>Domain:</strong> ${escapeHtml(domain)}</p>
              <p><strong>Team Size:</strong> ${teamSize}</p>
              <p><strong>Registration Date:</strong> ${date}</p>

            </div>

            <p style="color:#cbd5e1;line-height:1.7;margin-top:25px;">
              Please ensure your PPT and prototype links remain accessible
              to the hackathon review team.
            </p>

            <p style="color:#cbd5e1;">
              We look forward to seeing what you build!
            </p>

            <br />

            <strong style="color:#a78bfa;">Code-a-Nova Team</strong>

          </div>

          <div style="padding:18px;text-align:center;border-top:1px solid #272d45;">
            <p style="font-size:11px;color:#68738b;">
              This is an automated confirmation email.
              Please do not reply.
            </p>
          </div>

        </div>
      </body>
      </html>
    `,
  });
};
