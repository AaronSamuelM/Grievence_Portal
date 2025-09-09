const axios = require("axios");
require("dotenv").config();

const otpCache = new Map();

async function sendOtp(mobile) {
  if (!mobile) throw new Error("Mobile number is required");

  const otp = Math.floor(100000 + Math.random() * 900000);
  const message = `${otp} is the verification code to raise the grievance in the portal`;

  try {
    // NOTE: If you don’t want to actually call Fast2SMS in dev, just return otp here
    otpCache.set(mobile, { otp, expires: Date.now() + 5 * 60 * 1000 });
    return { otp, message: "OTP generated (mock)" };

    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message,
        language: "english",
        numbers: mobile,
      },
      {
        headers: {
          authorization: process.env.AUTH_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    otpCache.set(mobile, { otp, expires: Date.now() + 5 * 60 * 1000 });

    return { otp, message: "OTP sent successfully" };
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error("Failed to send OTP");
  }
}

function verifyOtp(mobile, otp) {
  if (!mobile || !otp) throw new Error("Mobile and OTP are required");

  const storedOtp = otpCache.get(mobile);

  if (!storedOtp) {
    throw new Error("OTP expired or not found");
  }

  if (storedOtp.expires < Date.now()) {
    otpCache.delete(mobile);
    throw new Error("OTP expired");
  }

  if (storedOtp.otp === Number(otp)) {
    otpCache.delete(mobile);
    return true;
  } else {
    throw new Error("Invalid OTP");
  }
}

module.exports = { sendOtp, verifyOtp };
