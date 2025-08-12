const express = require("express");
const router = express.Router();
const billingController = require("../controllers/billingController");
const auth = require("../middleware/auth");

// @route   POST api/billing
// @desc    Create a billing record
// @access  Private (Admin/Doctor)
router.post("/", auth, billingController.createBilling);

// @route   GET api/billing
// @desc    Get billing records for logged-in user
// @access  Private
router.get("/", auth, billingController.getUserBilling);

// @route   PUT api/billing/:id
// @desc    Update billing status
// @access  Private
router.put("/:id", auth, billingController.updateBillingStatus);

module.exports = router;
