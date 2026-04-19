import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { isDark, toggleTheme } = useTheme();
  const [step, setStep] = useState("email"); // "email" | "otp" | "password"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef([]);
  const { login, sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendOtp(email);
      toast.success("OTP sent to your email!");
      setStep("otp");
      setResendTimer(60);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpStr = otp.join("");
    if (otpStr.length < 6) return toast.error("Please enter the full 6-digit OTP");
    setLoading(true);
    try {
      await verifyOtp(email, otpStr);
      toast.success("Welcome back! 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back! 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setLoading(true);
    try {
      await sendOtp(email);
      toast.success("New OTP sent!");
      setResendTimer(60);
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="fade-in">
        <div style={{ ...styles.logo, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={styles.logoIcon}>⚡</span>
            <span style={styles.logoText}>SocialAI</span>
          </div>
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              borderRadius: 8,
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
              transition: "all 0.2s",
            }}
          >
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} style={{ color: isDark ? "#f59e0b" : "#0d9488" }} />
          </button>
        </div>

        {step === "email" && (
          <>
            <h2 style={styles.title}>Welcome back</h2>
            <p style={styles.subtitle}>Enter your email to receive a login OTP</p>
            <form onSubmit={handleSendOtp}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="label">Email Address</label>
                <input
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <button className="btn btn-primary" style={styles.fullBtn} type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : "Send OTP"}
              </button>
            </form>
            <div style={styles.divider}>
              <span style={styles.dividerLine} />
              <span style={styles.dividerText}>or</span>
              <span style={styles.dividerLine} />
            </div>
            <button
              className="btn"
              style={{ ...styles.fullBtn, background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
              onClick={() => setStep("password")}
            >
              Sign in with Password
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <button style={styles.backBtn} onClick={() => { setStep("email"); setOtp(["","","","","",""]); }}>← Back</button>
            <h2 style={styles.title}>Check your email</h2>
            <p style={styles.subtitle}>
              We sent a 6-digit code to <strong style={{ color: "var(--text-primary)" }}>{email}</strong>
            </p>
            <form onSubmit={handleVerifyOtp}>
              <div style={styles.otpRow} onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    style={{ ...styles.otpBox, borderColor: digit ? "var(--accent)" : "var(--border)" }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  />
                ))}
              </div>
              <button
                className="btn btn-primary"
                style={{ ...styles.fullBtn, marginTop: "1.5rem" }}
                type="submit"
                disabled={loading || otp.join("").length < 6}
              >
                {loading ? <span className="spinner" /> : "Verify OTP"}
              </button>
            </form>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              {resendTimer > 0 ? (
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Resend OTP in <strong style={{ color: "var(--accent-light)" }}>{resendTimer}s</strong>
                </p>
              ) : (
                <button style={styles.linkBtn} onClick={handleResend} disabled={loading}>Resend OTP</button>
              )}
            </div>
          </>
        )}

        {step === "password" && (
          <>
            <button style={styles.backBtn} onClick={() => setStep("email")}>← Back</button>
            <h2 style={styles.title}>Sign in with password</h2>
            <p style={styles.subtitle}>Enter your email and password to continue</p>
            <form onSubmit={handlePasswordLogin}>
              <div style={{ marginBottom: "1rem" }}>
                <label className="label">Email Address</label>
                <input
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="label">Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary" style={styles.fullBtn} type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : "Sign In"}
              </button>
            </form>
          </>
        )}

        <p style={styles.registerLink}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--accent-light)", textDecoration: "none" }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    padding: "1rem",
    background: "radial-gradient(ellipse at 50% 0%, rgba(13,148,136,0.08) 0%, var(--bg-primary) 60%)",
  },
  card: {
    background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px",
    padding: "2.5rem", width: "100%", maxWidth: "420px",
  },
  logo: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" },
  logoIcon: { fontSize: "1.5rem" },
  logoText: {
    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem",
    background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  title: { fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" },
  subtitle: { color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "2rem" },
  fullBtn: { width: "100%", justifyContent: "center", padding: "0.8rem" },
  divider: { display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.25rem 0" },
  dividerLine: { flex: 1, height: "1px", background: "var(--border)" },
  dividerText: { fontSize: "0.75rem", color: "var(--text-muted)" },
  otpRow: { display: "flex", gap: "0.5rem", justifyContent: "center" },
  otpBox: {
    width: "48px", height: "56px", textAlign: "center", fontSize: "1.5rem", fontWeight: 700,
    background: "var(--bg-secondary)", border: "1.5px solid var(--border)", borderRadius: "10px",
    outline: "none", transition: "border-color 0.2s", color: "var(--text-primary)",
  },
  backBtn: {
    background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer",
    fontSize: "0.85rem", padding: "0 0 1rem 0", display: "block",
  },
  linkBtn: {
    background: "none", border: "none", color: "var(--accent-light)", cursor: "pointer",
    fontSize: "0.85rem", textDecoration: "underline",
  },
  registerLink: { textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" },
};