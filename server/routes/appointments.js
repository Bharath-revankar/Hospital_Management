const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middleware/auth");

// @route   POST api/appointments
// @desc    Create an appointment
// @access  Private
router.post("/", auth, appointmentController.createAppointment);

// @route   GET api/appointments
// @desc    Get all appointments for a user
// @access  Private
router.get("/", auth, appointmentController.getAppointments);

// @route   PUT api/appointments/:id
// @desc    Update an appointment
// @access  Private
router.put("/:id", auth, appointmentController.updateAppointment);

// @route   DELETE api/appointments/:id
// @desc    Delete an appointment
// @access  Private
router.delete("/:id", auth, appointmentController.deleteAppointment);

module.exports = router;
