require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { emailTemplate } = require("./models/emailTemplate");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
    ];

    // In production, allow all Vercel deployments
    if (process.env.NODE_ENV === "production") {
      if (origin.endsWith(".vercel.app") || origin === "https://vercel.app") {
        return callback(null, true);
      }
    }

    // Check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static("public"));

// Email template (stored as EJS string)

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
    EMAIL: formData.employeeEmail || formData.email,
    PHONE: formData.phone,
    CULTURE_1: formData.culture1,
    CULTURE_2: formData.culture2,
    IMAGE_SLUG: formData.imageSlug,
    QUOTE: formData.quote || "",
    DESIGNATION: formData.designation || "",
  };

  return ejs.render(emailTemplate, templateData);
}

// Configure Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Backend is healthy ",
  });
});

// Preview endpoint
app.post("/api/preview", (req, res) => {
  try {
    const html = compileEmail(req.body);
    res.json({ html });
  } catch (error) {
    console.error("Preview error:", error);
    res.status(500).json({ error: "Failed to generate preview" });
  }
});

// Send email endpoint
app.post("/api/send", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Email builder server running on http://localhost:${PORT}`);
});
