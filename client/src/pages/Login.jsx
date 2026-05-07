import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
        {/* Left Panel */}
        <div className="auth-left">
          <div className="auth-left-content">
            <div className="auth-logo">✈️ StuPan Tour</div>
            <h2>Welcome Back, Explorer!</h2>
            <p>Sign in to access your bookings, wallet and upcoming Tamil Nadu adventures.</p>
            <div className="auth-places">
              {["🏔️ Ooty", "🌊 Kanyakumari", "🌿 Kodaikanal", "🏛️ Madurai", "💧 Hogenakkal", "🌳 Pichavaram"].map((p, i) => (
                <span className="place-chip" key={i}>{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Student Login</h1>
              <p>Enter your credentials to continue</p>
            </div>

            {error && <div className="auth-error">⚠️ {error}</div>}

            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
                {loading ? <><span className="btn-spinner" /> Signing In...</> : "🚀 Sign In"}
              </button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account? <Link to="/register">Register Free →</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;