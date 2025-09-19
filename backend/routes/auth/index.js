const express = require("express");
const jwt = require("jsonwebtoken");
const { sendOtp, verifyOtp } = require("../../services/otp");
const User = require("../../models/userSchema");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

// In-memory store (better to use DB/Redis in prod)
let refreshTokens = [];

// 🔹 Send OTP
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

// 🔹 Verify OTP + issue tokens
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

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "24h" });

    refreshTokens.push(refreshToken);

    return res.status(200).json({
      message: "OTP verified successfully",
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user._id,
        mobile: user.mobile,
        name: user.name,
        location: user.location,
        access: user.access,
      },
    });
  } catch (err) {
    console.error("Error in verify:", err.message);
    return res.status(400).json({ error: err.message });
  }
});

// 🔹 Refresh token endpoint
router.post("/refresh", (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(401).json({ error: "Token required" });

  if (!refreshTokens.includes(refresh_token)) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }

  jwt.verify(refresh_token, JWT_REFRESH_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired refresh token" });

    // Always fetch fresh user details
    const dbUser = await User.findById(user.id);
    if (!dbUser) return res.status(404).json({ error: "User not found" });

    const payload = {
      id: dbUser._id,
      mobile: dbUser.mobile,
      name: dbUser.name,
      location: dbUser.location,
      access: dbUser.access,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    const newRefreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "24h" });

    // Optional: rotate refresh tokens
    refreshTokens = refreshTokens.filter((t) => t !== refresh_token);
    refreshTokens.push(newRefreshToken);

    return res.json({
      access_token: accessToken,
      refresh_token: newRefreshToken,
      user: {
        id: dbUser._id,
        mobile: dbUser.mobile,
        name: dbUser.name,
        location: dbUser.location,
        access: dbUser.access,
      },
    });
  });
});

// 🔹 Logout (invalidate refresh token)
router.post("/logout", (req, res) => {
  const { refresh_token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== refresh_token);
  return res.json({ message: "Logged out" });
});

module.exports = router;
