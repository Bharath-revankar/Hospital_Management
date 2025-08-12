const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");
const auth = require("../middleware/auth");

// @route   POST api/records
// @desc    Create a medical record
// @access  Private (Doctors only)
router.post("/", auth, recordController.createRecord);

// @route   GET api/records/patient/:id
// @desc    Get all records for a patient
// @access  Private
router.get("/patient/:id", auth, recordController.getPatientRecords);

// @route   GET api/records
// @desc    Get all records for logged-in user
// @access  Private
router.get("/", auth, recordController.getUserRecords);

module.exports = router;
