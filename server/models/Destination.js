const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String, // heritage, eco, adventure, etc.
    },
    budgetRange: {
      type: String, // low / medium
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);
