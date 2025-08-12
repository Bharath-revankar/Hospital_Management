const MedicalRecord = require("../models/MedicalRecord");
const { encrypt, decrypt } = require("../utils/crypto");

// Create a new medical record
exports.createRecord = async (req, res) => {
  const { patient, record } = req.body;

  // Check if user is a doctor
  if (req.user.role !== "doctor") {
    return res.status(403).json({ msg: "Access denied. Doctors only." });
  }

  try {
    // Encrypt the medical record
    const encryptedRecord = encrypt(record);

    const newRecord = new MedicalRecord({
      patient,
      doctor: req.user.id,
      record: encryptedRecord,
    });

    const savedRecord = await newRecord.save();
    res.json(savedRecord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all records for a specific patient
exports.getPatientRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.id })
      .populate("doctor", "name")
      .populate("patient", "name");

    // Decrypt records before sending
    const decryptedRecords = records.map((record) => ({
      ...record.toObject(),
      record: decrypt(record.record),
    }));

    res.json(decryptedRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get records for logged-in user
exports.getUserRecords = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "patient") {
      query = { patient: req.user.id };
    } else if (req.user.role === "doctor") {
      query = { doctor: req.user.id };
    } else {
      return res.status(403).json({ msg: "Access denied" });
    }

    const records = await MedicalRecord.find(query)
      .populate("doctor", "name")
      .populate("patient", "name");

    // Decrypt records before sending
    const decryptedRecords = records.map((record) => ({
      ...record.toObject(),
      record: decrypt(record.record),
    }));

    res.json(decryptedRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
