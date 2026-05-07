const Booking = require("../models/Booking");
const Trip = require("../models/Trip");
const User = require("../models/User");

// CREATE Booking
exports.createBooking = async (req, res) => {
  try {
    const { tripId, persons, travelDate } = req.body;
    const userId = req.user.userId;

    if (!tripId || !persons || !travelDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const totalAmount = trip.price * persons;

    if (user.walletBalance < totalAmount) {
      return res.status(400).json({
        message: `Insufficient wallet balance. You need ₹${totalAmount} but have ₹${user.walletBalance}`,
      });
    }

    // Deduct wallet balance
    user.walletBalance -= totalAmount;
    await user.save();

    const booking = await Booking.create({
      user: userId,
      trip: tripId,
      persons,
      travelDate,
      amountPaid: totalAmount,
      status: "CONFIRMED",
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("trip", "title location image duration price")
      .populate("user", "name email college");

    res.status(201).json({
      message: "Booking confirmed successfully!",
      booking: populatedBooking,
      newWalletBalance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET User's Bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate("trip", "title location image duration price district category rating")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (booking.status === "CANCELLED") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    // Refund wallet
    const user = await User.findById(req.user.userId);
    user.walletBalance += booking.amountPaid;
    await user.save();

    booking.status = "CANCELLED";
    await booking.save();

    res.json({
      message: "Booking cancelled. Refund added to wallet.",
      refundAmount: booking.amountPaid,
      newWalletBalance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
