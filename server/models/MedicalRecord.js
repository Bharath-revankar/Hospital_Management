const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  record: {
    type: String, // Encrypted
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = MedicalRecord = mongoose.model(
  "medicalRecord",
  MedicalRecordSchema
);
