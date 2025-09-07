// routes/auth/index.js
const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; 
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

router.post("/login", async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  try {
    const response = await axios.post("http://localhost:5000/otp/send", {
      mobile,
    });

    return res.status(200).json({
      message: "OTP sent via login",
      data: response.data,
    });
  } catch (err) {
    console.error("Error in login:", err.message);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});

router.post("/verify", async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ error: "Mobile and OTP are required" });
  }

  try {
    const response = await axios.post("http://localhost:5000/otp/verify", {
      mobile,
      otp,
    });

    if (response.data.error) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const accessToken = jwt.sign({ mobile }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ mobile }, JWT_REFRESH_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "OTP verified successfully",
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (err) {
    console.error("Error in verify:", err.message);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
});

module.exports = router;
