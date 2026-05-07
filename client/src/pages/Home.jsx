import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const features = [
  { icon: "🏔️", title: "Hill Stations", desc: "Ooty, Kodaikanal, Yercaud & more breathtaking peaks" },
  { icon: "🌊", title: "Beach Escapes", desc: "Marina Beach, Kanyakumari, Rameswaram shorelines" },
  { icon: "🏛️", title: "Heritage Sites", desc: "Thanjavur, Mahabalipuram UNESCO wonders" },
  { icon: "🌿", title: "Forest Trails", desc: "Valparai, Topslip, Pichavaram wildlife adventures" },
];

const stats = [
  { num: "20+", label: "Destinations" },
  { num: "5000+", label: "Happy Students" },
  { num: "100%", label: "Safe Travel" },
  { num: "₹1999", label: "Starting Price" },
];

const testimonials = [
  { name: "Priya S.", college: "Anna University", text: "The Ooty trip was absolutely magical! StuPan Tour made everything so easy and affordable.", avatar: "👩‍🎓", rating: 5 },
  { name: "Karthik M.", college: "PSG College", text: "Kanyakumari at sunrise was a life-changing experience. Best student trip ever!", avatar: "👨‍🎓", rating: 5 },
  { name: "Divya R.", college: "Coimbatore Institute", text: "Loved the Pichavaram mangrove boat ride! Such an underrated gem in Tamil Nadu.", avatar: "👩‍💻", rating: 5 },
];

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="home">
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb1" />
          <div className="hero-orb orb2" />
          <div className="hero-orb orb3" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content container">
          <div className="hero-badge fade-in-up">
            <span className="pulse-dot" />
            🎓 Exclusively for Tamil Nadu Students
          </div>
          <h1 className="hero-title fade-in-up">
            Explore the Wonders of<br />
            <span className="gradient-text">Tamil Nadu</span> with Us
          </h1>
          <p className="hero-subtitle fade-in-up">
            Discover 20+ stunning destinations — from misty hill stations to golden beaches,
            ancient temples to lush forests — all at student-friendly prices.
          </p>
          <div className="hero-actions fade-in-up">
            <button className="btn btn-primary btn-lg" onClick={() => navigate("/trips")}>
              🗺️ Explore Trips
            </button>
            {!token && (
              <button className="btn btn-ghost btn-lg" onClick={() => navigate("/register")}>
                🎓 Register Free
              </button>
            )}
          </div>
          <div className="hero-stats fade-in-up">
            {stats.map((s, i) => (
              <div className="hero-stat" key={i}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator">
            <span />
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="section features-section">
        <div className="container">
          <p className="section-label">WHY STUPAN TOUR</p>
          <h2 className="section-title">Every Type of Tamil Nadu Adventure</h2>
          <p className="section-subtitle">From the Blue Mountains to the Coromandel Coast — we cover it all</p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card glass-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR DESTINATIONS ─── */}
      <section className="section destinations-section">
        <div className="container">
          <p className="section-label">FEATURED PLACES</p>
          <h2 className="section-title">Popular Tamil Nadu Destinations</h2>
          <p className="section-subtitle">Hand-picked gems for the student traveller</p>
          <div className="dest-grid">
            {[
              { name: "Ooty", tag: "Hill Station", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", price: "₹4,999" },
              { name: "Kanyakumari", tag: "Scenic", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80", price: "₹6,499" },
              { name: "Madurai", tag: "Heritage", img: "https://images.unsplash.com/photo-1616803140344-6682af78bfbd?w=600&q=80", price: "₹3,999" },
              { name: "Valparai", tag: "Wildlife", img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80", price: "₹5,999" },
              { name: "Pichavaram", tag: "Forest", img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", price: "₹2,499" },
              { name: "Kodaikanal", tag: "Hill Station", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80", price: "₹5,499" },
            ].map((d, i) => (
              <div className="dest-card" key={i}>
                <img src={d.img} alt={d.name} loading="lazy" />
                <div className="dest-overlay">
                  <span className="dest-tag">{d.tag}</span>
                  <div className="dest-info">
                    <h3>{d.name}</h3>
                    <span className="dest-price">From {d.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: "40px" }}>
            <Link to="/trips" className="btn btn-primary">View All 20 Destinations →</Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section how-section">
        <div className="container">
          <p className="section-label">HOW IT WORKS</p>
          <h2 className="section-title">Book Your Dream Trip in 3 Steps</h2>
          <div className="steps-grid">
            {[
              { step: "01", icon: "📝", title: "Register", desc: "Create your free student account with college details" },
              { step: "02", icon: "🗺️", title: "Choose Trip", desc: "Browse 20+ Tamil Nadu destinations and pick your favorite" },
              { step: "03", icon: "✅", title: "Book & Go", desc: "Pay with wallet balance and get instant confirmation" },
            ].map((s, i) => (
              <div className="step-card" key={i}>
                <div className="step-number">{s.step}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {i < 2 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section testimonials-section">
        <div className="container">
          <p className="section-label">STUDENT REVIEWS</p>
          <h2 className="section-title">What Students Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card glass-card" key={i}>
                <div className="stars">{"⭐".repeat(t.rating)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <span className="author-avatar">{t.avatar}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.college}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Explore Tamil Nadu? 🏝️</h2>
            <p>Join 5000+ students who've already discovered incredible Tamil Nadu</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
              <Link to="/trips" className="btn btn-outline btn-lg">Browse Trips</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
