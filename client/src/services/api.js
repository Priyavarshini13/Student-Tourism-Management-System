import axios from "axios";

const API = axios.create({ baseURL: "https://student-tourism-api.onrender.com/api" });

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Trips
export const getTrips = (params) => API.get("/trips", { params });
export const getTripById = (id) => API.get(`/trips/${id}`);
export const seedTrips = () => API.get("/trips/seed");

// Bookings
export const createBooking = (data) => API.post("/bookings", data);
export const getMyBookings = () => API.get("/bookings/my");
export const cancelBooking = (id) => API.put(`/bookings/cancel/${id}`);

export default API;