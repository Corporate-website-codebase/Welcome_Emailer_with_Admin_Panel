const { Resend } = require("resend");
const ejs = require("ejs");
const { emailTemplate } = require("../models/emailTemplate");

// Configure Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to compile template
function compileEmail(formData) {
  const pronounMap = {
    she: { subject: "she", object: "her" },
    he: { subject: "he", object: "him" },
    they: { subject: "they", object: "them" },
  };

  const pronouns = pronounMap[formData.pronoun] || pronounMap.she;

  // Generate about title based on pronoun
  const aboutTitle = `A bit about ${pronouns.object}: `;

  const templateData = {
    NAME: formData.name,
    WELCOME: formData.welcome,
    ABOUT_TITLE: aboutTitle,
    ABOUT_DESC: formData.aboutDesc,
    EMAIL: formData.employeeEmail,
    PHONE: formData.phone,
    CULTURE_1: formData.culture1,
    CULTURE_2: formData.culture2,
    IMAGE_SLUG: formData.imageSlug,
    QUOTE: formData.quote || "",
    DESIGNATION: formData.designation || "",
  };

  return ejs.render(emailTemplate, templateData);
}

exports.previewEmail = (req, res) => {
  try {
    const html = compileEmail(req.body);
    res.json({ html });
  } catch (error) {
    console.error("Preview error:", error);
    res.status(500).json({ error: "Failed to generate preview" });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const html = compileEmail(req.body);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM || "onboarding@resend.dev",
      to: req.body.email,
      subject: `Welcome to Kalolwala & Associates, ${req.body.name}!`,
      html,
    });

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: `Email sent successfully to ${req.body.email}!`,
      messageId: data.id,
    });
  } catch (error) {
    console.error("Send error:", error.message);

    res.status(500).json({
      success: false,
      error: "Failed to send email",
      message: error.message,
    });
  }
};
