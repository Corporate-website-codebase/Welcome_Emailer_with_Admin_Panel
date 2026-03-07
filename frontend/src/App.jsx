import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import LoadingScreen from "../components/LoadingScreen";

// API URL - uses environment variable in production, localhost in development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const EmailBuilder = () => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [formData, setFormData] = useState({
    name: "Sarika Alate",
    pronoun: "she",
    welcome:
      "We are pleased to welcome Soumya Jha to the Project Management team at Gurgaon. Hailing from New Delhi, she brings a strong foundation in client relationship management and a drive to make meaningful contributions to K&A.",
    aboutDesc:
      "She enjoys reading novels, writing, cooking and has a special interest in Mysticism, learning, skill building and traveling. You can reach her at ",
    email: "soumya.kapm@gmail.com",
    employeeEmail: "soumya.kapm@gmail.com",
    phone: "+91-9876543210",
    culture1:
      "you have joined a vibrant team of thinkers, creators and problem-solvers who believe in rewriting the rules of communication. At K&A, every idea — big or small — matters and every team member shapes the work we proudly deliver.",
    culture2:
      "Our culture has grown over years of curiosity, innovation and shared learning. As you begin your K&A journey, connect with colleagues, explore new possibilities and don't hesitate to ask, we're always here to help.",
    imageSlug: "Soumya_Jha.png",
  });

  const [previewHtml, setPreviewHtml] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generatePreview = async () => {
    try {
      const response = await fetch(`${API_URL}/api/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Server not responding");
      }

      const data = await response.json();
      setPreviewHtml(data.html);
      setMessage("");
    } catch (error) {
      console.error("Preview error:", error);
      setPreviewHtml(`
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui; flex-direction: column; background: #f5f5f5; padding: 40px; text-align: center;">
          <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 500px;">
            <h2 style="color: #e74c3c; margin-bottom: 16px;">⚠️ Backend Server Not Running</h2>
            <p style="color: #666; margin-bottom: 24px; line-height: 1.6;">
              The email preview requires the Node.js backend server to be running.
            </p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: left; margin-bottom: 20px;">
              <p style="margin: 0 0 12px 0; font-weight: 600; color: #333;">Quick Start:</p>
              <code style="display: block; background: #2d3436; color: #00ff00; padding: 12px; border-radius: 4px; margin-bottom: 8px; font-size: 13px;">npm install</code>
              <code style="display: block; background: #2d3436; color: #00ff00; padding: 12px; border-radius: 4px; font-size: 13px;">node server.js</code>
            </div>
            <p style="color: #666; font-size: 14px; margin: 0;">
              Server should run on <strong>http://localhost:3001</strong>
            </p>
          </div>
        </div>
      `);
    }
  };

  const sendEmail = async () => {
    setSending(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMessage(data.message || "Email sent successfully!");
    } catch (error) {
      setMessage("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (user) {
      generatePreview();
    }
  }, [formData, user]);

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s, background-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontSize: "13px",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.5)",
    letterSpacing: "0.02em",
  };

  const fieldStyle = {
    marginBottom: "20px",
  };

  // Show loading screen on initial load
  if (showLoadingScreen) {
    return <LoadingScreen onComplete={() => setShowLoadingScreen(false)} />;
  }

  // Show loading while checking auth
  if (isAuthLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "#fff",
          fontSize: "18px",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "2px solid rgba(247, 205, 70, 0.2)",
            borderTopColor: "#F7CD46",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        backgroundColor: "#000",
      }}
    >
      <div
        style={{
          width: "420px",
          backgroundColor: "#000",
          color: "#fff",
          overflowY: "auto",
          padding: "28px 24px",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "22px",
            marginBottom: "24px",
            fontWeight: "700",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#fff" }}>Email </span>
          <span style={{ color: "#F7CD46" }}>Builder</span>
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            paddingBottom: "20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div style={{ fontSize: "13px", color: "#71717a" }}>
            Logged in as:{" "}
            <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              {user.email}
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 18px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              fontSize: "13px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s, border-color 0.2s",
            }}
          >
            Logout
          </button>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Employee Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Pronoun</label>
          <select
            value={formData.pronoun}
            onChange={(e) => handleChange("pronoun", e.target.value)}
            style={inputStyle}
          >
            <option value="she">She/Her</option>
            <option value="he">He/Him</option>
            <option value="they">They/Them</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Welcome Paragraph</label>
          <textarea
            value={formData.welcome}
            onChange={(e) => handleChange("welcome", e.target.value)}
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>About Description</label>
          <textarea
            value={formData.aboutDesc}
            onChange={(e) => handleChange("aboutDesc", e.target.value)}
            rows={2}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Employee Email(Template)</label>
          <input
            type="email"
            value={formData.employeeEmail}
            onChange={(e) => handleChange("employeeEmail", e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Send To</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Culture Paragraph 1</label>
          <textarea
            value={formData.culture1}
            onChange={(e) => handleChange("culture1", e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Culture Paragraph 2</label>
          <textarea
            value={formData.culture2}
            onChange={(e) => handleChange("culture2", e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Image Slug</label>
          <input
            type="text"
            value={formData.imageSlug}
            onChange={(e) => handleChange("imageSlug", e.target.value)}
            placeholder="e.g., Sarika_Alate"
            style={inputStyle}
          />
        </div>

        <button
          onClick={sendEmail}
          disabled={sending}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: sending ? "rgba(255, 255, 255, 0.08)" : "#f5c518",
            color: sending ? "rgba(255, 255, 255, 0.4)" : "#000",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: "700",
            fontFamily: "'Inter', sans-serif",
            cursor: sending ? "not-allowed" : "pointer",
            opacity: sending ? 0.7 : 1,
            transition: "transform 0.2s, box-shadow 0.2s",
            letterSpacing: "-0.01em",
          }}
        >
          {sending ? "Sending..." : "Send Email"}
        </button>

        {message && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px 16px",
              backgroundColor: message.includes("success")
                ? "rgba(34, 197, 94, 0.1)"
                : "rgba(239, 68, 68, 0.1)",
              border: message.includes("success")
                ? "1px solid rgba(34, 197, 94, 0.2)"
                : "1px solid rgba(239, 68, 68, 0.2)",
              color: message.includes("success") ? "#86efac" : "#fca5a5",
              borderRadius: "12px",
              fontSize: "13px",
            }}
          >
            {message}
          </div>
        )}
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            backgroundColor: "rgba(18, 18, 20, 0.6)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: "600",
              color: "rgba(255, 255, 255, 0.8)",
              letterSpacing: "-0.01em",
            }}
          >
            Live Preview
          </h2>
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <iframe
            srcDoc={previewHtml}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              backgroundColor: "#000",
              display: "block",
            }}
            title="Email Preview"
          />
        </div>
      </div>
    </div>
  );
};

export default EmailBuilder;
