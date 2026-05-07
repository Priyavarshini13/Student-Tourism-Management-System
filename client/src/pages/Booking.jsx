import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../services/api";
import "./Booking.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip;
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [form, setForm] = useState({ persons: 1, travelDate: "" });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    if (!trip) navigate("/trips");
  }, [trip, navigate]);

  if (!trip) return null;

  const totalAmount = trip.price * form.persons;
  const walletBalance = user?.walletBalance || 0;
  const canAfford = walletBalance >= totalAmount;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.travelDate) { setError("Please select a travel date."); return; }
    if (!canAfford) { setError("Insufficient wallet balance."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await createBooking({ tripId: trip._id, persons: form.persons, travelDate: form.travelDate });
      // Update local wallet
      const updatedUser = { ...user, walletBalance: res.data.newWalletBalance };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setConfirmed(res.data.booking);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Confirmation Screen ───
  if (confirmed) {
    return (
      <div className="page-wrapper booking-page">
        <div className="container">
          <div className="confirmation-card glass-card">
            <div className="confirm-icon">🎉</div>
            <h2>Booking Confirmed!</h2>
            <p className="confirm-sub">Your adventure is booked. Get ready to explore Tamil Nadu!</p>
            <div className="confirm-details">
              <div className="confirm-row"><span>Destination</span><strong>{trip.title}</strong></div>
              <div className="confirm-row"><span>Location</span><strong>{trip.location}</strong></div>
              <div className="confirm-row"><span>Travel Date</span><strong>{new Date(form.travelDate).toDateString()}</strong></div>
              <div className="confirm-row"><span>Persons</span><strong>{form.persons}</strong></div>
              <div className="confirm-row"><span>Amount Paid</span><strong className="amount-paid">₹{totalAmount.toLocaleString()}</strong></div>
              <div className="confirm-row"><span>Status</span><span className="badge badge-green">✓ CONFIRMED</span></div>
            </div>
            <div className="confirm-actions">
              <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>View My Bookings</button>
              <button className="btn btn-ghost" onClick={() => navigate("/trips")}>Explore More Trips</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Booking Form ───
  return (
    <div className="page-wrapper booking-page">
      <div className="booking-header">
        <div className="container">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back to Trips</button>
          <h1>Complete Your <span className="gradient-text">Booking</span></h1>
        </div>
      </div>

      <div className="container">
        <div className="booking-layout">
          {/* ─── Form ─── */}
          <div className="booking-form-wrap">
            <div className="glass-card booking-form-card">
              <h2>📋 Booking Details</h2>

              {/* User Info */}
              <div className="user-info-section">
                <h3>👤 Your Information</h3>
                <div className="info-grid">
                  <div className="info-item"><label>Name</label><span>{user?.name}</span></div>
                  <div className="info-item"><label>Email</label><span>{user?.email}</span></div>
                  <div className="info-item"><label>College</label><span>{user?.college}</span></div>
                  <div className="info-item wallet-item">
                    <label>Wallet Balance</label>
                    <span className={canAfford ? "wallet-ok" : "wallet-low"}>
                      ₹{walletBalance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="divider" />

              {error && <div className="auth-error">⚠️ {error}</div>}

              <form onSubmit={handleSubmit} className="booking-inputs">
                <div className="form-group">
                  <label className="form-label">Number of Persons</label>
                  <div className="persons-control">
                    <button type="button" className="person-btn" onClick={() => setForm(f => ({ ...f, persons: Math.max(1, f.persons - 1) }))}>−</button>
                    <span className="person-count">{form.persons}</span>
                    <button type="button" className="person-btn" onClick={() => setForm(f => ({ ...f, persons: Math.min(trip.maxPersons, f.persons + 1) }))}>+</button>
                    <span className="person-limit">Max {trip.maxPersons}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Travel Date</label>
                  <input
                    className="form-input"
                    type="date"
                    min={minDate}
                    value={form.travelDate}
                    onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                    required
                  />
                </div>

                <div className="amount-summary">
                  <div className="amount-row">
                    <span>₹{trip.price.toLocaleString()} × {form.persons} person{form.persons > 1 ? "s" : ""}</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="amount-row total-row">
                    <span>Total Amount</span>
                    <strong>₹{totalAmount.toLocaleString()}</strong>
                  </div>
                  {!canAfford && (
                    <div className="wallet-warning">
                      ⚠️ Insufficient balance. You need ₹{(totalAmount - walletBalance).toLocaleString()} more.
                    </div>
                  )}
                </div>

                <button
                  className="btn btn-primary btn-full"
                  type="submit"
                  disabled={loading || !canAfford}
                >
                  {loading ? <><span className="btn-spinner" /> Processing...</> : `✅ Confirm & Pay ₹${totalAmount.toLocaleString()}`}
                </button>
                <p className="payment-note">🔒 Secured via Wallet Payment · Instant Confirmation</p>
              </form>
            </div>
          </div>

          {/* ─── Trip Summary ─── */}
          <div className="booking-summary">
            <div className="glass-card trip-summary-card">
              <img src={trip.image} alt={trip.title} className="summary-img" />
              <div className="summary-body">
                <span className="badge badge-blue">{trip.category}</span>
                <h3>{trip.title}</h3>
                <p className="summary-location">📍 {trip.location}</p>
                <div className="summary-stats">
                  <div><span>⏱️ Duration</span><strong>{trip.duration}</strong></div>
                  <div><span>⭐ Rating</span><strong>{trip.rating}/5</strong></div>
                </div>
                <div className="divider" />
                <p className="summary-desc">{trip.description}</p>
                {trip.includes?.length > 0 && (
                  <div className="summary-includes">
                    <h4>✅ What's Included</h4>
                    {trip.includes.map((inc, i) => <span key={i} className="include-item">✓ {inc}</span>)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
