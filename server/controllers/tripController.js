const Trip = require("../models/Trip");

// =====================
// TAMIL NADU SEED DATA
// =====================
const sampleTrips = [
  {
    title: "Ooty — Queen of Hill Stations",
    location: "Ooty, Nilgiris",
    district: "Nilgiris",
    description: "Experience the breathtaking beauty of Ooty with its lush tea gardens, scenic Botanical Gardens, and the famous Nilgiri Mountain Railway. Perfect for a refreshing hill escape.",
    price: 4999,
    duration: "3 Days / 2 Nights",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Hill Station",
    rating: 4.8,
    maxPersons: 25,
    includes: ["Hotel Stay", "Breakfast", "Sightseeing", "Transport"],
    highlights: ["Ooty Lake", "Botanical Gardens", "Doddabetta Peak", "Tea Factory Visit"],
  },
  {
    title: "Kodaikanal — Princess of Hill Stations",
    location: "Kodaikanal, Dindigul",
    district: "Dindigul",
    description: "Nestled in the Palani Hills, Kodaikanal offers star-shaped lakes, silver waterfalls, and dense shola forests. A paradise for nature lovers and trekkers.",
    price: 5499,
    duration: "4 Days / 3 Nights",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    category: "Hill Station",
    rating: 4.7,
    maxPersons: 20,
    includes: ["Hotel Stay", "All Meals", "Boat Ride", "Trekking Guide"],
    highlights: ["Kodai Lake", "Silver Cascade", "Coaker's Walk", "Bear Shola Falls"],
  },
  {
    title: "Kanyakumari — Land's End Marvel",
    location: "Kanyakumari",
    district: "Kanyakumari",
    description: "Witness the stunning confluence of three seas — Arabian Sea, Bay of Bengal, and Indian Ocean. Watch the spectacular sunrise and sunset at India's southernmost tip.",
    price: 6499,
    duration: "3 Days / 2 Nights",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    category: "Beach",
    rating: 4.9,
    maxPersons: 30,
    includes: ["Hotel Stay", "Breakfast", "Boat Ride", "Sightseeing"],
    highlights: ["Vivekananda Rock", "Thiruvalluvar Statue", "Sunrise Point", "Kumari Amman Temple"],
  },
  {
    title: "Rameswaram — Spiritual Seashore",
    location: "Rameswaram, Ramanathapuram",
    district: "Ramanathapuram",
    description: "One of the holiest pilgrimage sites in India, Rameswaram is famous for its magnificent Ramanathaswamy Temple corridors and pristine beaches.",
    price: 4499,
    duration: "3 Days / 2 Nights",
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80",
    category: "Temple",
    rating: 4.6,
    maxPersons: 40,
    includes: ["Hotel Stay", "Breakfast", "Temple Tour", "Beach Visit"],
    highlights: ["Ramanathaswamy Temple", "Pamban Bridge", "Dhanushkodi", "Agni Theertham"],
  },
  {
    title: "Mahabalipuram — Stone Shore Wonders",
    location: "Mahabalipuram, Chengalpattu",
    district: "Chengalpattu",
    description: "A UNESCO World Heritage Site famous for its stunning rock-cut temples, Shore Temple, and exquisite Pallava-era sculptures by the Bay of Bengal.",
    price: 3499,
    duration: "2 Days / 1 Night",
    image: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80",
    category: "Heritage",
    rating: 4.5,
    maxPersons: 35,
    includes: ["Hotel Stay", "Breakfast", "Guide", "Entry Tickets"],
    highlights: ["Shore Temple", "Pancha Rathas", "Arjuna's Penance", "Krishna's Butter Ball"],
  },
  {
    title: "Madurai — Temple City of South India",
    location: "Madurai",
    district: "Madurai",
    description: "The cultural capital of Tamil Nadu, Madurai is home to the iconic Meenakshi Amman Temple. Experience the vibrant culture, delicious street food, and ancient heritage.",
    price: 3999,
    duration: "3 Days / 2 Nights",
    image: "https://images.unsplash.com/photo-1616803140344-6682af78bfbd?w=800&q=80",
    category: "Temple",
    rating: 4.7,
    maxPersons: 45,
    includes: ["Hotel Stay", "Breakfast", "Temple Tour", "Local Food Tour"],
    highlights: ["Meenakshi Temple", "Thirumalai Nayak Palace", "Gandhi Museum", "Alagar Hills"],
  },
  {
    title: "Hogenakkal — Niagara of India",
    location: "Hogenakkal, Dharmapuri",
    district: "Dharmapuri",
    description: "Known as the Niagara Falls of India, Hogenakkal boasts powerful cascading waterfalls on the Kaveri River. Enjoy thrilling coracle rides through the misty gorges.",
    price: 2999,
    duration: "2 Days / 1 Night",
    image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=800&q=80",
    category: "Waterfall",
    rating: 4.6,
    maxPersons: 30,
    includes: ["Accommodation", "Breakfast", "Coracle Ride", "Guide"],
    highlights: ["Waterfalls", "Coracle Ride", "Fish Massage", "Kaveri River"],
  },
  {
    title: "Valparai — Hidden Gem of Anamalais",
    location: "Valparai, Coimbatore",
    district: "Coimbatore",
    description: "A pristine hill town surrounded by dense Anamalai Tiger Reserve forests and sprawling tea estates. Spot wild elephants, leopards, and rare birds in their natural habitat.",
    price: 5999,
    duration: "4 Days / 3 Nights",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    category: "Forest",
    rating: 4.8,
    maxPersons: 15,
    includes: ["Jungle Resort", "All Meals", "Jungle Safari", "Wildlife Guide"],
    highlights: ["Anamalai Tiger Reserve", "Tea Gardens", "Sholayar Dam", "Ratnagiri Waterfalls"],
  },
  {
    title: "Pichavaram Mangrove Forest",
    location: "Pichavaram, Cuddalore",
    district: "Cuddalore",
    description: "One of the world's largest mangrove forests, Pichavaram is a magical ecosystem of intertwined waterways, canals, and lush green mangrove islands perfect for boat rides.",
    price: 2499,
    duration: "2 Days / 1 Night",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    category: "Forest",
    rating: 4.5,
    maxPersons: 25,
    includes: ["Accommodation", "Breakfast", "Boat Ride", "Bird Watching"],
    highlights: ["Mangrove Boat Ride", "Bird Sanctuary", "Chidambaram Temple", "Seashore"],
  },
  {
    title: "Yercaud — Jewel of South India",
    location: "Yercaud, Salem",
    district: "Salem",
    description: "A picturesque hill station on the Shevaroy Hills, Yercaud is known for its coffee plantations, serene lake, and lush orange groves — an affordable yet stunning getaway.",
    price: 3499,
    duration: "3 Days / 2 Nights",
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
    category: "Hill Station",
    rating: 4.4,
    maxPersons: 20,
    includes: ["Hotel Stay", "Breakfast", "Sightseeing", "Boating"],
    highlights: ["Yercaud Lake", "Bear's Cave", "Lady's Seat", "Coffee Plantations"],
  },
  {
    title: "Coonoor — Tea Trails of Nilgiris",
    location: "Coonoor, Nilgiris",
    district: "Nilgiris",
    description: "Coonoor, the second-largest hill station in the Nilgiris, is famous for its sprawling tea estates, colonial bungalows, and panoramic views of the Western Ghats.",
    price: 4299,
    duration: "3 Days / 2 Nights",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    category: "Hill Station",
    rating: 4.6,
    maxPersons: 20,
    includes: ["Heritage Hotel", "Breakfast", "Tea Factory Tour", "Toy Train Ride"],
    highlights: ["Sim's Park", "Dolphin's Nose", "Lamb's Rock", "Highfield Tea Factory"],
  },
  {
    title: "Courtallam — Spa of South India",
    location: "Courtallam, Tenkasi",
    district: "Tenkasi",
    description: "Known as the 'Spa of South India', Courtallam's medicinal waterfalls cascade through herb-rich forests. The mineral-laden water is believed to have healing properties.",
    price: 3299,
    duration: "2 Days / 1 Night",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    category: "Waterfall",
    rating: 4.5,
    maxPersons: 30,
    includes: ["Hotel Stay", "Breakfast", "Waterfall Visits", "Ayurvedic Spa"],
    highlights: ["Main Falls", "Five Falls", "Old Courtallam", "Papanasam Dam"],
  },
  {
    title: "Thanjavur — City of Big Temple",
    location: "Thanjavur",
    district: "Thanjavur",
    description: "Home to the magnificent UNESCO-listed Brihadeeswarar Temple, Thanjavur is the heartland of Tamil culture, classical arts, and ancient Chola dynasty grandeur.",
    price: 3799,
    duration: "3 Days / 2 Nights",
    image: "https://images.unsplash.com/photo-1609340163571-8a1b89dc3ae6?w=800&q=80",
    category: "Heritage",
    rating: 4.7,
    maxPersons: 40,
    includes: ["Hotel Stay", "Breakfast", "Heritage Tour", "Museum Entry"],
    highlights: ["Brihadeeswarar Temple", "Thanjavur Palace", "Saraswathi Mahal Library", "Royal Museum"],
  },
  {
    title: "Yelagiri — Trekker's Paradise",
    location: "Yelagiri, Vellore",
    district: "Vellore",
    description: "A quiet hill station in the Eastern Ghats, Yelagiri is a paradise for trekkers, paragliders, and nature lovers seeking tranquility away from the city hustle.",
    price: 2799,
    duration: "2 Days / 1 Night",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    category: "Hill Station",
    rating: 4.3,
    maxPersons: 25,
    includes: ["Resort Stay", "Breakfast", "Paragliding", "Trekking"],
    highlights: ["Swamimalai Hill Trek", "Punganur Lake", "Paragliding", "Nature Park"],
  },
  {
    title: "Topslip — Anamalai Wildlife Safari",
    location: "Topslip, Coimbatore",
    district: "Coimbatore",
    description: "Gateway to the Anamalai Tiger Reserve (Indira Gandhi Wildlife Sanctuary), Topslip offers thrilling jungle safaris, elephant camp visits, and breathtaking forest trails.",
    price: 4799,
    duration: "3 Days / 2 Nights",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80",
    category: "Forest",
    rating: 4.8,
    maxPersons: 15,
    includes: ["Forest Lodge", "All Meals", "Jungle Safari", "Elephant Camp"],
    highlights: ["Tiger Reserve Safari", "Elephant Camp", "Bird Watching", "Amaravathi Dam"],
  },
  {
    title: "Velankanni — Lourdes of the East",
    location: "Velankanni, Nagapattinam",
    district: "Nagapattinam",
    description: "A major Catholic pilgrimage site on the Coromandel Coast, Velankanni is home to the miraculous Basilica of Our Lady of Good Health, visited by millions annually.",
    price: 2999,
    duration: "2 Days / 1 Night",
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&q=80",
    category: "Temple",
    rating: 4.6,
    maxPersons: 50,
    includes: ["Hotel Stay", "Breakfast", "Church Visit", "Beach Walk"],
    highlights: ["Basilica of Our Lady", "Pilgrimage Beach", "Nagapattinam Coast", "Heritage Walk"],
  },
  {
    title: "Chennai Marina Beach",
    location: "Marina Beach, Chennai",
    district: "Chennai",
    description: "The world's second-longest natural urban beach stretches 13 km along Chennai's coastline. Enjoy the golden sands, iconic lighthouse, and vibrant food stalls.",
    price: 1999,
    duration: "2 Days / 1 Night",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    category: "Beach",
    rating: 4.4,
    maxPersons: 50,
    includes: ["Hotel Stay", "Breakfast", "City Tour", "Beach Activities"],
    highlights: ["Marina Beach", "Fort St. George", "Kapaleeshwarar Temple", "Government Museum"],
  },
  {
    title: "Pollachi — Gateway to Western Ghats",
    location: "Pollachi, Coimbatore",
    district: "Coimbatore",
    description: "A charming town surrounded by coconut groves and the majestic Western Ghats, Pollachi is the gateway to Anamalai Hills and serves as backdrop for many Tamil films.",
    price: 3299,
    duration: "2 Days / 1 Night",
    image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80",
    category: "Forest",
    rating: 4.4,
    maxPersons: 30,
    includes: ["Resort Stay", "Breakfast", "Sightseeing", "Village Walk"],
    highlights: ["Anamalai Hills", "Monkey Falls", "Coconut Groves", "Tribal Villages"],
  },
  {
    title: "Nilgiris — Blue Mountain Circuit",
    location: "Nilgiris District",
    district: "Nilgiris",
    description: "The complete Nilgiris Blue Mountain circuit covers Ooty, Coonoor, Kotagiri, and the stunning viewpoints across the entire district — the crown jewel of Tamil Nadu tourism.",
    price: 8999,
    duration: "6 Days / 5 Nights",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Hill Station",
    rating: 4.9,
    maxPersons: 20,
    includes: ["Premium Hotel", "All Meals", "Toy Train", "All Sightseeing", "Guide"],
    highlights: ["Doddabetta", "Avalanche Lake", "Pykara Falls", "Mudumalai Safari"],
  },
  {
    title: "Coimbatore — Manchester of South India",
    location: "Coimbatore",
    district: "Coimbatore",
    description: "A dynamic industrial city at the foothills of Western Ghats, Coimbatore offers the stunning Isha Yoga Center, Marudhamalai Temple, and is the gateway to hill stations.",
    price: 2499,
    duration: "2 Days / 1 Night",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    category: "Heritage",
    rating: 4.3,
    maxPersons: 40,
    includes: ["Hotel Stay", "Breakfast", "City Tour", "Isha Yoga Center Visit"],
    highlights: ["Isha Yoga Center", "Marudhamalai Temple", "VOC Park", "Perur Temple"],
  },
];

// GET All Trips
exports.getAllTrips = async (req, res) => {
  try {
    const { district, category, minPrice, maxPrice, search } = req.query;
    let filter = { available: true };

    if (district) filter.district = { $regex: district, $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { district: { $regex: search, $options: "i" } },
      ];
    }

    const trips = await Trip.find(filter).sort({ rating: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Single Trip
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEED Tamil Nadu Trips
exports.seedTrips = async (req, res) => {
  try {
    await Trip.deleteMany({});
    const trips = await Trip.insertMany(sampleTrips);
    res.json({ message: `Seeded ${trips.length} Tamil Nadu trips!`, trips });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};