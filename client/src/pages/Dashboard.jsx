import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBookings, cancelBooking } from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [cancellingId, setCancellingId] = useState(null);
  const [toast, setToast] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!localStorage.getItem("token")) { navigate("/login"); return; }
    fetchBookings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch { } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Cancel this booking? Amount will be refunded to your wallet.")) return;
    setCancellingId(bookingId);
    try {
      const res = await cancelBooking(bookingId);
      // Update wallet in localStorage
      const updatedUser = { ...user, walletBalance: res.data.newWalletBalance };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      showToast(`Booking cancelled. ₹${res.data.refundAmount} refunded!`);
      fetchBookings();
    } catch (err) {
      showToast(err.response?.data?.message || "Cancellation failed.", "error");
    } finally {
      setCancellingId(null);
    }
  };

  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  const cancelled = bookings.filter((b) => b.status === "CANCELLED");
  const upcoming = confirmed.filter((b) => new Date(b.travelDate) >= new Date());
  const totalSpent = confirmed.reduce((sum, b) => sum + b.amountPaid, 0);
  const walletBalance = JSON.parse(localStorage.getItem("user") || "null")?.walletBalance ?? user?.walletBalance ?? 0;

  const stats = [
    { icon: "✈️", label: "Total Trips", value: bookings.length, color: "blue" },
    { icon: "✅", label: "Confirmed", value: confirmed.length, color: "green" },
    { icon: "📅", label: "Upcoming", value: upcoming.length, color: "orange" },
    { icon: "💸", label: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, color: "purple" },
  ];

  const renderBookingCard = (b) => {
    const isUpcoming = new Date(b.travelDate) >= new Date();
    const isCancelled = b.status === "CANCELLED";
    return (
      <div key={b._id} className={`booking-card glass-card ${isCancelled ? "cancelled" : ""}`}>
        <div className="booking-card-img">
          <img src={b.trip?.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=60"} alt={b.trip?.title} />
          {isCancelled && <div className="cancelled-overlay">CANCELLED</div>}
        </div>
        <div className="booking-card-body">
          <div className="booking-card-top">
            <div>
              <span className="booking-category">{b.trip?.category || "Trip"}</span>
              <h3 className="booking-title">{b.trip?.title}</h3>
              <p className="booking-location">📍 {b.trip?.location}</p>
            </div>
            <span className={`badge ${isCancelled ? "badge-red" : isUpcoming ? "badge-green" : "badge-blue"}`}>
              {isCancelled ? "Cancelled" : isUpcoming ? "Upcoming" : "Completed"}
            </span>
          </div>
          <div className="booking-meta-grid">
            <div className="booking-meta-item"><span>📅 Travel Date</span><strong>{new Date(b.travelDate).toDateString()}</strong></div>
            <div className="booking-meta-item"><span>👥 Persons</span><strong>{b.persons}</strong></div>
            <div className="booking-meta-item"><span>⏱️ Duration</span><strong>{b.trip?.duration}</strong></div>
            <div className="booking-meta-item"><span>💰 Amount</span><strong className="amount-highlight">₹{b.amountPaid.toLocaleString()}</strong></div>
          </div>
          {!isCancelled && isUpcoming && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleCancel(b._id)}
              disabled={cancellingId === b._id}
            >
              {cancellingId === b._id ? "Cancelling..." : "Cancel Booking"}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="page-wrapper dashboard-page">
      {/* Toast */}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}

      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-bg" />
        <div className="container">
          <div className="dashboard-hero">
            <div className="user-avatar">{user?.name?.[0]?.toUpperCase() || "S"}</div>
            <div className="user-info">
              <h1>Welcome back, <span className="gradient-text">{user?.name?.split(" ")[0]}!</span></h1>
              <p>🎓 {user?.college} · {user?.email}</p>
            </div>
            <div className="wallet-badge glass-card">
              <div className="wallet-icon">💰</div>
              <div>
                <span className="wallet-label">Wallet Balance</span>
                <span className="wallet-amount">₹{walletBalance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className={`stat-card glass-card stat-${s.color}`} key={i}>
              <span className="stat-icon">{s.icon}</span>
              <div>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label-sm">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          {[
            { id: "overview", label: "📊 Overview" },
            { id: "upcoming", label: `📅 Upcoming (${upcoming.length})` },
            { id: "all", label: `🗂️ All Bookings (${bookings.length})` },
            { id: "cancelled", label: `❌ Cancelled (${cancelled.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >{tab.label}</button>
          ))}
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : (
          <>
            {/* ─── Overview Tab ─── */}
            {activeTab === "overview" && (
              <div className="overview-section">
                <div className="overview-grid">
                  {/* Profile Card */}
                  <div className="glass-card profile-card">
                    <h3>👤 Student Profile</h3>
                    <div className="profile-avatar-big">{user?.name?.[0]?.toUpperCase() || "S"}</div>
                    <h4>{user?.name}</h4>
                    <p>{user?.email}</p>
                    <div className="divider" />
                    <div className="profile-detail"><span>🏫 College</span><strong>{user?.college}</strong></div>
                    <div className="profile-detail"><span>💰 Wallet</span><strong>₹{walletBalance.toLocaleString()}</strong></div>
                    <div className="profile-detail"><span>✈️ Total Trips</span><strong>{bookings.length}</strong></div>
                  </div>

                  {/* Upcoming trips */}
                  <div className="overview-right">
                    <div className="glass-card overview-card">
                      <div className="overview-card-header">
                        <h3>📅 Upcoming Adventures</h3>
                        <button className="tab-link" onClick={() => setActiveTab("upcoming")}>View All →</button>
                      </div>
                      {upcoming.length === 0 ? (
                        <div className="empty-mini">
                          <span>🗺️</span>
                          <p>No upcoming trips yet.</p>
                          <button className="btn btn-primary btn-sm" onClick={() => navigate("/trips")}>Explore Trips</button>
                        </div>
                      ) : (
                        <div className="upcoming-list">
                          {upcoming.slice(0, 3).map((b) => (
                            <div className="upcoming-item" key={b._id}>
                              <img src={b.trip?.image} alt={b.trip?.title} className="upcoming-img" />
                              <div className="upcoming-details">
                                <strong>{b.trip?.title}</strong>
                                <span>📅 {new Date(b.travelDate).toDateString()}</span>
                                <span>👥 {b.persons} person{b.persons > 1 ? "s" : ""}</span>
                              </div>
                              <span className="upcoming-amount">₹{b.amountPaid.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Upcoming Tab ─── */}
            {activeTab === "upcoming" && (
              <div>
                {upcoming.length === 0 ? (
                  <div className="empty-state">
                    <span>📅</span>
                    <h3>No upcoming trips</h3>
                    <p>Book a trip to see it here!</p>
                    <button className="btn btn-primary" onClick={() => navigate("/trips")}>Browse Trips</button>
                  </div>
                ) : (
                  <div className="bookings-grid">{upcoming.map(renderBookingCard)}</div>
                )}
              </div>
            )}

            {/* ─── All Bookings ─── */}
            {activeTab === "all" && (
              <div>
                {bookings.length === 0 ? (
                  <div className="empty-state">
                    <span>🗂️</span>
                    <h3>No bookings yet</h3>
                    <p>Start exploring Tamil Nadu!</p>
                    <button className="btn btn-primary" onClick={() => navigate("/trips")}>Explore Trips</button>
                  </div>
                ) : (
                  <div className="bookings-grid">{bookings.map(renderBookingCard)}</div>
                )}
              </div>
            )}

            {/* ─── Cancelled Tab ─── */}
            {activeTab === "cancelled" && (
              <div>
                {cancelled.length === 0 ? (
                  <div className="empty-state">
                    <span>✅</span>
                    <h3>No cancelled bookings</h3>
                    <p>All your trips are confirmed!</p>
                  </div>
                ) : (
                  <div className="bookings-grid">{cancelled.map(renderBookingCard)}</div>
                )}
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="dashboard-cta glass-card">
          <div>
            <h3>🌟 Ready for Your Next Adventure?</h3>
            <p>Explore more stunning Tamil Nadu destinations</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/trips")}>Browse All Trips →</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;