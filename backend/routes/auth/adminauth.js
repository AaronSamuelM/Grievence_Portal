const express = require("express");
const jwt = require("jsonwebtoken");
const { sendOtp, verifyOtp } = require("../../services/otp");
const Admin = require("../../models/adminSchema");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

let refreshTokens = [];

// =======================
// Admin Login - Send OTP
// =======================
router.post("/login", async (req, res) => {
  const { mobile } = req.body;

  try {
    // check if admin exists
    const admin = await Admin.findOne({ mobile, access: "admin" });
    if (!admin) {
      return res.status(403).json({ error: "Only registered admin accounts can login" });
    }

    // send OTP
    const result = await sendOtp(mobile);
    res.json({ message: "Admin OTP sent", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// Admin Login - Verify OTP
// =======================
// =======================
// Admin Login - Verify OTP
// =======================
router.post("/verify", async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const isValid = verifyOtp(mobile, otp); // no await since it's sync now
    if (!isValid) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const admin = await Admin.findOne({ mobile});
    // if (!admin) {
    //   return res.status(403).json({ error: "Only admin accounts allowed here" });
    // }

    const payload = {
      id: admin._id,
      mobile: admin.mobile,
      name: admin.name,
      access: admin.access,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "24h" });

    res.json({
      message: "Admin login success",
      access_token: accessToken,
      refresh_token: refreshToken,
      user: payload,
    });
  } catch (err) {
    // catch the thrown error from verifyOtp
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
