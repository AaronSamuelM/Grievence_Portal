const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Grievance = require("../../models/grievanceSchema");

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/raise", upload.array("images", 10), async (req, res) => {
  try {
    const { name, mobile, title, grievance, department, latitude, longitude, address } = req.body;
    const imageURLs = req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const newGrievance = new Grievance({
      name,
      mobile,
      title,
      grievance,
      department,
      imageURL: imageURLs, // ✅ keep as array
      latitude,
      longitude,
      address,
    });

    const saved = await newGrievance.save();

    return res.status(201).json({
      message: "Grievance raised successfully",
      data: { id: saved._id },
    });
  } catch (err) {
    console.error("Error saving grievance:", err.message);
    return res.status(500).json({ error: "Server error while saving grievance" });
  }
});

// 🔹 Track grievance by ID + mobile
router.post("/track", async (req, res) => {
  try {
    const { complaintId, mobile } = req.body;

    if (!complaintId || !mobile) {
      return res.status(400).json({ error: "Complaint ID and mobile are required" });
    }

    const grievance = await Grievance.findOne({ _id: complaintId, mobile });
    if (!grievance) {
      return res.status(404).json({ error: "Grievance not found" });
    }

    return res.json({
      message: "Grievance fetched successfully",
      data: grievance,
    });
  } catch (err) {
    console.error("Error fetching grievance:", err.message);
    return res.status(500).json({ error: "Server error while fetching grievance" });
  }
});

// 🔹 List grievances by mobile (for logged-in users)
router.post("/list", async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ error: "Mobile is required" });

    const grievances = await Grievance.find({ mobile }).sort({ createdAt: -1 });

    return res.json({
      message: "Grievances fetched successfully",
      data: grievances,
    });
  } catch (err) {
    console.error("Error listing grievances:", err.message);
    return res.status(500).json({ error: "Server error while fetching list" });
  }
});


// 🔹 Serve uploaded files
router.use("/uploads", express.static(uploadDir));

module.exports = router;
