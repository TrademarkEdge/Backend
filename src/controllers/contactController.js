const transporter = require("../../config/emailConfig");

exports.sendContactEmail = async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const htmlContent = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1f1f1f; color: #ffffff; padding: 30px; border-radius: 8px;">
    <div style="max-width: 600px; margin: auto; background-color: #2a2a2a; padding: 20px; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.5);">
      <h2 style="color: #c79240; margin-bottom: 20px; font-size: 24px;">New Contact Form Submission</h2>
      <p><strong style="color: #c79240;">Name:</strong> <span style="color: #ffffff;">${fullName}</span></p>
      <p><strong style="color: #c79240;">Email:</strong> <span style="color: #ffffff;">${email}</span></p>
      <p><strong style="color: #c79240;">Subject:</strong> <span style="color: #ffffff;">${subject}</span></p>
      <p><strong style="color: #c79240;">Message:</strong></p>
      <div style="background-color: #111111; padding: 15px; border-radius: 5px; color: #ffffff; line-height: 1.5;">
        ${message}
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #888888;">This message was sent from your trademark website contact form.</p>
    </div>
  </div>
  `;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form: ${subject}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
