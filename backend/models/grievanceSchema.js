const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    grievance: {
      type: String,
      required: true,
    },
    department: {
      type: [String],
      required: true,
    },
    imageURL: {
      type: [String],
      default: []
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grievance", grievanceSchema);
