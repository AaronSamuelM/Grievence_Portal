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

module.exports = router;
