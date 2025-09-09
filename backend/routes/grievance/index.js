const express = require("express");
const router = express.Router();
const Grievance = require("../../models/grievanceSchema");

router.post("/raise", async (req, res) => {
    try {
        const {
            name,
            mobile,
            title,
            grievance,
            department,
            imageURL,
            latitude,
            longitude,
            address
        } = req.body;

        const grievances = new Grievance({
            name,
            mobile,
            title,
            grievance,
            department,
            imageURL,
            latitude,
            longitude,
            address
        });

        const savedGrievance = await grievances.save();

        res.status(201).json({
            message: "Grievance has been raised successfully",
            data: savedGrievance,
        });
    } catch (err) {
        console.error("Error saving grievance:", err);
        res.status(500).json({ error: "Server error" });
    }
});

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
