import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        padding: "20px",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Subtle radial glow behind the card */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 30%, rgba(247, 205, 70, 0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          backgroundColor: "rgba(18, 18, 20, 0.4)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "48px 40px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          width: "100%",
          maxWidth: "420px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <h1
          style={{
            color: "#fff",
            marginBottom: "4px",
            fontSize: "28px",
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          Welcome <span style={{ color: "#f5c518" }}>Emailer</span>
        </h1>
        <p
          style={{
            color: "#71717a",
            marginBottom: "36px",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "500",
                letterSpacing: "0.02em",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                outline: "none",
                transition: "border-color 0.2s, background-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(247, 205, 70, 0.4)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label
              style={{
                display: "block",
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "500",
                letterSpacing: "0.02em",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: "100%",
                padding: "14px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                outline: "none",
                transition: "border-color 0.2s, background-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(247, 205, 70, 0.4)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
              }}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#fca5a5",
                padding: "12px 16px",
                borderRadius: "12px",
                marginBottom: "20px",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading
                ? "rgba(255, 255, 255, 0.08)"
                : "#f5c518",
              color: loading ? "rgba(255, 255, 255, 0.4)" : "#000",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "700",
              fontFamily: "'Inter', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              opacity: loading ? 0.7 : 1,
              letterSpacing: "-0.01em",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = "scale(1.02)";
                e.target.style.boxShadow =
                  "0 4px 20px rgba(247, 205, 70, 0.25)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }
            }}
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
