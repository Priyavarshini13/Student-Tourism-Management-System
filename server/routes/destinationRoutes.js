const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// Add destination (admin/demo)
router.post("/", async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
