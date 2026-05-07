const express = require("express");
const router = express.Router();
const { getAllTrips, getTripById, seedTrips } = require("../controllers/tripController");

router.get("/", getAllTrips);
router.get("/seed", seedTrips);
router.get("/:id", getTripById);

module.exports = router;