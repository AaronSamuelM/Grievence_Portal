const express = require("express");
const jwt = require("jsonwebtoken");
const { sendOtp, verifyOtp } = require("../../services/otp");
const User = require('../../models/userSchema')

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

router.post("/login", async (req, res) => {
  const { mobile } = req.body;

  try {
    const result = await sendOtp(mobile);

    return res.status(200).json({
      message: "OTP sent via login",
      data: result,
    });
  } catch (err) {
    console.error("Error in login:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/verify", async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const valid = verifyOtp(mobile, otp);
    if (!valid) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    let user = await User.findOne({ mobile });

    if (!user) {
      user = await User.create({
        mobile,
        name: null,
        location: null,
        access: "user",
      });
    }

    const payload = {
      id: user._id,
      mobile: user.mobile,
      name: user.name,
      location: user.location,
      access: user.access,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "OTP verified successfully",
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (err) {
    console.error("Error in verify:", err.message);
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
