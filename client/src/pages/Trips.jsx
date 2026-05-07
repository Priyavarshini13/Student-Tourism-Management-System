import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTrips } from "../services/api";
import "./Trips.css";

const CATEGORIES = ["All", "Hill Station", "Beach", "Temple", "Forest", "Waterfall", "Heritage"];
const DISTRICTS = ["All Districts", "Nilgiris", "Dindigul", "Kanyakumari", "Ramanathapuram",
  "Chengalpattu", "Madurai", "Dharmapuri", "Coimbatore", "Cuddalore", "Salem",
  "Tenkasi", "Thanjavur", "Vellore", "Nagapattinam", "Chennai"];

function StarRating({ rating }) {
  return (
    <span className="trip-rating">
      {"⭐".repeat(Math.floor(rating))}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </span>
  );
}

function TripCard({ trip, onBook }) {
  return (
    <div className="trip-card">
      <div className="trip-image-wrap">
        <img src={trip.image} alt={trip.title} loading="lazy" />
        <div className="trip-category-badge">{trip.category}</div>
        <div className="trip-image-overlay" />
      </div>
      <div className="trip-card-body">
        <div className="trip-meta">
          <span className="trip-location">📍 {trip.location}</span>
          <StarRating rating={trip.rating} />
        </div>
        <h3 className="trip-title">{trip.title}</h3>
        <p className="trip-desc">{trip.description.substring(0, 100)}...</p>
        <div className="trip-details">
          <span className="trip-detail"><span>⏱️</span>{trip.duration}</span>
          <span className="trip-detail"><span>👥</span>Max {trip.maxPersons}</span>
        </div>
        {trip.highlights?.length > 0 && (
          <div className="trip-highlights">
            {trip.highlights.slice(0, 3).map((h, i) => (
              <span className="highlight-tag" key={i}>✓ {h}</span>
            ))}
          </div>
        )}
        <div className="trip-card-footer">
          <div className="trip-price">
            <span className="price-label">Per Person</span>
            <span className="price-value">₹{trip.price.toLocaleString()}</span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => onBook(trip)}>
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

function Trips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [district, setDistrict] = useState("All Districts");
  const [budget, setBudget] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const fetchTrips = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category !== "All") params.category = category;
      if (district !== "All Districts") params.district = district;
      if (budget) params.maxPrice = budget;
      const res = await getTrips(params);
      let data = res.data;
      if (sortBy === "price-asc") data = [...data].sort((a, b) => a.price - b.price);
      else if (sortBy === "price-desc") data = [...data].sort((a, b) => b.price - a.price);
      else if (sortBy === "rating") data = [...data].sort((a, b) => b.rating - a.rating);
      setTrips(data);
    } catch {
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchTrips(); }, [search, category, district, budget, sortBy]);

  const handleSeed = async () => {
    try {
      const { seedTrips } = await import("../services/api");
      await seedTrips();
      fetchTrips();
    } catch { }
  };

  const handleBook = (trip) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    navigate("/booking", { state: { trip } });
  };

  const clearFilters = () => {
    setSearch(""); setCategory("All"); setDistrict("All Districts"); setBudget(""); setSortBy("rating");
  };

  return (
    <div className="page-wrapper trips-page">
      {/* Header */}
      <div className="trips-header">
        <div className="trips-header-bg" />
        <div className="container">
          <p className="section-label">TAMIL NADU ADVENTURES</p>
          <h1 className="trips-heading">Discover <span className="gradient-text">20+ Destinations</span></h1>
          <p className="trips-subheading">From Nilgiris peaks to coastal shores — your perfect Tamil Nadu trip awaits</p>
        </div>
      </div>

      <div className="container">
        {/* Seed Button (show if no trips) */}
        {trips.length === 0 && !loading && (
          <div className="seed-banner">
            <p>No trips found in database.</p>
            <button className="btn btn-secondary btn-sm" onClick={handleSeed}>
              🌱 Load Sample Tamil Nadu Trips
            </button>
          </div>
        )}

        {/* ─── Filters ─── */}
        <div className="filters-panel glass-card">
          <div className="filter-search">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search destinations, districts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button className="clear-btn" onClick={() => setSearch("")}>✕</button>}
          </div>
          <div className="filter-controls">
            <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select className="filter-select" value={district} onChange={(e) => setDistrict(e.target.value)}>
              {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select className="filter-select" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">Any Budget</option>
              <option value="3000">Under ₹3,000</option>
              <option value="5000">Under ₹5,000</option>
              <option value="7000">Under ₹7,000</option>
              <option value="10000">Under ₹10,000</option>
            </select>
            <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="rating">⭐ Top Rated</option>
              <option value="price-asc">₹ Price: Low to High</option>
              <option value="price-desc">₹ Price: High to Low</option>
            </select>
            <button className="btn btn-ghost btn-sm" onClick={clearFilters}>Clear All</button>
          </div>
        </div>

        {/* Category Chips */}
        <div className="category-chips">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`cat-chip ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >{c}</button>
          ))}
        </div>

        {/* Results Count */}
        <div className="results-bar">
          <span>{trips.length} destination{trips.length !== 1 ? "s" : ""} found</span>
          {(search || category !== "All" || district !== "All Districts" || budget) && (
            <button className="clear-link" onClick={clearFilters}>Clear filters ✕</button>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : trips.length === 0 ? (
          <div className="empty-state">
            <span>🗺️</span>
            <h3>No destinations match your filters</h3>
            <p>Try adjusting your search or <button onClick={clearFilters} className="clear-link">clear all filters</button></p>
          </div>
        ) : (
          <div className="trips-grid">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} onBook={handleBook} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Trips;