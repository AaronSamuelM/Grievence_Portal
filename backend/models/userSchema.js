const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    mobile: { type: String, required: true, unique: true },
    name: { type: String, default: null },
    location: { type: String, default: null },
    access: { type: String, default: "user" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
