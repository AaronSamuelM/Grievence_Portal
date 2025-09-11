const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Grievance = require("../../models/grievanceSchema");

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
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
    const imageURLs = req.files.map((file) => `/uploads/${file.filename}`);

    const grievances = new Grievance({
      name,
      mobile,
      title,
      grievance,
      department,
      imageURL: imageURLs.join(","),
      latitude,
      longitude,
      address,
    });

    const savedGrievance = await grievances.save();

    // Check if the grievance ID is set and return it
    if (savedGrievance.id) {
      res.status(201).json({
        message: "Grievance has been raised successfully",
        data: {
          id: savedGrievance.id, // Ensure this is being returned properly
        },
      });
    } else {
      res.status(400).json({ error: "Grievance ID not generated" });
    }
  } catch (err) {
    console.error("Error saving grievance:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.use("/uploads", express.static(uploadDir));

router.get("/track", async (req, res) => {
  try {
    const { complaintId, mobile } = req.query;

    if (!complaintId || !mobile) {
      return res.status(400).json({ error: "Complaint ID and Mobile are required" });
    }

    const grievance = await Grievance.findOne({
      _id: complaintId,
      mobile: mobile,
    });

    if (!grievance) {
      return res.status(404).json({ error: "Grievance not found" });
    }

    res.status(200).json({
      message: "Grievance details fetched successfully",
      data: grievance,
    });
  } catch (err) {
    console.error("Error fetching grievance:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
