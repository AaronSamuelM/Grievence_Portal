const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    aadhar: { type: String, required: true },          // Aadhaar number
    address: { type: String, required: true },         // Manual address
    latitude: { type: Number, required: true },        // From LocationPicker
    longitude: { type: Number, required: true },       // From LocationPicker
    location: { type: String, default: null },         // optional extra field
    access: { type: String, default: "admin" },        // for signup you’re setting admin
    activeTask: { type: Number, default: 0 },
    tasks: { type: [String], default: [] },            // store multiple task IDs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
