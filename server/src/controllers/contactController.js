import transporter from "../config/mailer.js";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Trim and validate field lengths
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanSubject ||
      !cleanMessage ||
      cleanName.length > 100 ||
      cleanSubject.length > 150 ||
      cleanMessage.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "Please check your fields and try again.",
      });
    }

    // Send email to the configured inbox
    await transporter.sendMail({
      from: `"Code-A-Nova Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: cleanEmail,
      subject: `Contact Form: ${cleanSubject}`,
      text: `
You have received a new contact message.

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}

Message:
${cleanMessage}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #222;">
          <h2 style="color: #6d5dfc;">New Contact Message</h2>
          <p>You have received a new message through the Code-A-Nova website.</p>

          <div style="padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
          </div>

          <h3>Message</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(cleanMessage)}</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now. Please try again later.",
    });
  }
};

// Escape user input before inserting it into HTML email content
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });