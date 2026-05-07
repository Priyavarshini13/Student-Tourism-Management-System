import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", college: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.college) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await registerUser(form);
      setSuccess("🎉 Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb1" />
        <div className="auth-orb auth-orb2" />
      </div>
      <div className="auth-container">
        {/* Left */}
        <div className="auth-left">
          <div className="auth-left-content">
            <div className="auth-logo">✈️ StuPan Tour</div>
            <h2>Start Your Tamil Nadu Journey!</h2>
            <p>Join thousands of students exploring the wonders of Tamil Nadu — from Ooty's mist to Kanyakumari's sunrise.</p>
            <div className="auth-perks">
              {[
                { icon: "💰", text: "₹1000 Welcome Wallet Bonus" },
                { icon: "🎓", text: "Student-Only Discounts" },
                { icon: "🛡️", text: "Safe & Verified Packages" },
                { icon: "📱", text: "Instant Booking Confirmation" },
              ].map((p, i) => (
                <div className="perk-item" key={i}>
                  <span>{p.icon}</span>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Create Account</h1>
              <p>Register and get ₹1000 welcome bonus!</p>
            </div>

            {error && <div className="auth-error">⚠️ {error}</div>}
            {success && <div className="auth-success">✅ {success}</div>}

            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input className="form-input" type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input className="form-input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input className="form-input" type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">College / University</label>
                <div className="input-wrapper">
                  <span className="input-icon">🏫</span>
                  <input className="form-input" type="text" name="college" placeholder="Your college name" value={form.college} onChange={handleChange} required />
                </div>
              </div>

              <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
                {loading ? <><span className="btn-spinner" /> Creating Account...</> : "🎓 Register Free"}
              </button>
            </form>

            <div className="auth-footer">
              <p>Already have an account? <Link to="/login">Sign In →</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;