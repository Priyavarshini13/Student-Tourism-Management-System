import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">✈️ StuPan Tour</div>
            <p className="footer-tagline">
              Discover the incredible beauty of Tamil Nadu — designed exclusively for students.
            </p>
            <div className="footer-socials">
              <a href="#!" aria-label="Facebook">📘</a>
              <a href="#!" aria-label="Instagram">📸</a>
              <a href="#!" aria-label="Twitter">🐦</a>
              <a href="#!" aria-label="YouTube">▶️</a>
            </div>
          </div>

          {/* Destinations */}
          <div className="footer-col">
            <h4>Top Destinations</h4>
            <ul>
              <li><Link to="/trips">🏔️ Ooty</Link></li>
              <li><Link to="/trips">🌊 Kanyakumari</Link></li>
              <li><Link to="/trips">🌿 Kodaikanal</Link></li>
              <li><Link to="/trips">🏛️ Madurai</Link></li>
              <li><Link to="/trips">🌳 Pichavaram</Link></li>
              <li><Link to="/trips">💧 Hogenakkal</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/trips">All Trips</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Student Login</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li>📍 Tamil Nadu, India</li>
              <li>📞 +91 98765 43210</li>
              <li>📧 info@stupantour.in</li>
              <li>🕘 Mon–Sat: 9AM–6PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 StuPan Tour. All rights reserved. Made with ❤️ for Tamil Nadu students.</p>
          <div className="footer-tags">
            <span>#TamilNaduTourism</span>
            <span>#StudentTravel</span>
            <span>#IncredibleTN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
