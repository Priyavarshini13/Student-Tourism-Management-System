const express = require("express");
const router = express.Router();
const { createBooking, getMyBookings, cancelBooking } = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createBooking);
router.get("/my", authMiddleware, getMyBookings);
router.put("/cancel/:id", authMiddleware, cancelBooking);

module.exports = router;
