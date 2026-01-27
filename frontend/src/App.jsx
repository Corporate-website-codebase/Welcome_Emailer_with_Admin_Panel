import React, { useState, useEffect } from "react";

// API URL - uses environment variable in production, localhost in development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const EmailBuilder = () => {
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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generatePreview = async () => {
    try {
      const response = await fetch(`${API_URL}/api/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    generatePreview();
  }, [formData]);

  const inputStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2a2a2a",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
  };

  const fieldStyle = {
    marginBottom: "20px",
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "#1a1a1a",
          color: "#fff",
          overflowY: "auto",
          padding: "24px",
          borderRight: "1px solid #333",
        }}
      >
        <h1
          style={{ fontSize: "24px", marginBottom: "24px", color: "#ffde00" }}
        >
          Email Builder
        </h1>

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
            padding: "12px",
            backgroundColor: "#ffde00",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: sending ? "not-allowed" : "pointer",
            opacity: sending ? 0.6 : 1,
          }}
        >
          {sending ? "Sending..." : "Send Email"}
        </button>

        {message && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              backgroundColor: message.includes("success")
                ? "#1a4d2e"
                : "#4d1a1a",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "24px",
            backgroundColor: "#fff",
            borderBottom: "1px solid #ddd",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", color: "#333" }}>
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
