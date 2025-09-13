const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    mobile: { type: String, required: true, unique: true },
    name: { type: String,required : true , default: null },
    location: { type: String, required : true , default: null },
    access: { type: String, default: "user" },
    activeTask: { type: Number , default: 0 },
    tasks: { type: [String] , default: null }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);