import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">✈️</span>
          <span className="logo-text">
            Stu<span className="logo-accent">Pan</span> Tour
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><Link to="/" className={isActive("/") ? "active" : ""}>Home</Link></li>
          <li><Link to="/trips" className={isActive("/trips") ? "active" : ""}>Trips</Link></li>
          {token && <li><Link to="/booking" className={isActive("/booking") ? "active" : ""}>Booking</Link></li>}
          {token && <li><Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>Dashboard</Link></li>}
        </ul>

        {/* Auth Buttons */}
        <div className="nav-auth">
          {token ? (
            <>
              <span className="nav-user">👋 {user?.name?.split(" ")[0]}</span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/">🏠 Home</Link>
        <Link to="/trips">🗺️ Trips</Link>
        {token && <Link to="/booking">📋 Booking</Link>}
        {token && <Link to="/dashboard">📊 Dashboard</Link>}
        <div className="mobile-auth">
          {token ? (
            <button className="btn btn-danger btn-sm btn-full" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm btn-full">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm btn-full">Register Free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
