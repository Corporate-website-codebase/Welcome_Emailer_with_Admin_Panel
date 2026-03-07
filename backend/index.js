require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { initDatabase } = require("./db");
const authRoutes = require("./routes/auth");
const emailRoutes = require("./routes/email");

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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));

// Initialize database
initDatabase();

// Auth routes
app.use("/api/auth", authRoutes);

// Email routes
app.use("/api", emailRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Backend is healthy ",
  });
});

app.listen(PORT, () => {
  console.log(`Email builder server running on http://localhost:${PORT}`);
});
