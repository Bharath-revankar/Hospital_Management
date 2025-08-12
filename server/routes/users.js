const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// @route   POST api/users/register
// @desc    Register new user
// @access  Public
router.post("/register", userController.registerUser);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post("/login", userController.loginUser);

// @route   GET api/users/doctors
// @desc    Get all doctors
// @access  Public
router.get("/doctors", userController.getDoctors);

// @route   GET api/users/patients
// @desc    Get all patients
// @access  Private
router.get("/patients", auth, userController.getPatients);

module.exports = router;
