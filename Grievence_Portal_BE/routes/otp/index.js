const express = require("express");
const router = express.Router();
const axios = require("axios");
require('dotenv').config()

const otpCache = new Map();

router.post("/send", async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const message = `${otp} is the verification code to raise the grievance in the portal`;

  try {
    // //Comment this axios call and return the message with OTP directly instead of response
    // const response = await axios.post(
    //   "https://www.fast2sms.com/dev/bulkV2",
    //   {
    //     route: "q",
    //     message,
    //     language: "english",
    //     numbers: mobile,
    //   },
    //   {
    //     headers: {
    //       authorization: process.env.AUTH_KEY,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    otpCache.set(mobile, { otp, expires: Date.now() + 5 * 60 * 1000 });

    return res.status(200).json({
      message: "OTP sent successfully",
      data: message,
    });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    return res.status(500).json({
      error: "Failed to send OTP",
      details: error.response ? error.response.data : error.message,
    });
  }
});

router.post("/verify", (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp) {
    return res.status(400).json({ error: "Mobile and OTP are required" });
  }

  const storedOtp = otpCache.get(mobile);

  if (!storedOtp) {
    return res.status(400).json({ error: "OTP expired or not found" });
  }

  if (storedOtp.expires < Date.now()) {
    otpCache.delete(mobile);
    return res.status(400).json({ error: "OTP expired" });
  }

  if (storedOtp.otp === Number(otp)) {
    otpCache.delete(mobile);
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
  }
});

module.exports = router;
