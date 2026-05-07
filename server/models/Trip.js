const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    district: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ["Hill Station", "Beach", "Temple", "Forest", "Waterfall", "Heritage"],
      default: "Hill Station",
    },
    rating: { type: Number, default: 4.5 },
    maxPersons: { type: Number, default: 20 },
    includes: [{ type: String }],
    highlights: [{ type: String }],
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);