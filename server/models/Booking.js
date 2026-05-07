const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    persons: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["CONFIRMED", "PENDING", "CANCELLED"],
      default: "CONFIRMED",
    },
    paymentMethod: {
      type: String,
      default: "Wallet",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
