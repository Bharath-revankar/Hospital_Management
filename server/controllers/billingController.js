const Billing = require("../models/Billing");
const { encrypt, decrypt } = require("../utils/crypto");

// Create a new billing record
exports.createBilling = async (req, res) => {
  const { patient, amount, description } = req.body;

  // Check if user is admin or doctor
  if (req.user.role !== "admin" && req.user.role !== "doctor") {
    return res.status(403).json({ msg: "Access denied" });
  }

  try {
    // Encrypt the amount
    const encryptedAmount = encrypt(amount.toString());
    const encryptedDescription = encrypt(description || "");

    const newBilling = new Billing({
      patient,
      amount: encryptedAmount,
      description: encryptedDescription,
      createdBy: req.user.id,
    });

    const savedBilling = await newBilling.save();
    res.json(savedBilling);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get billing records for logged-in user
exports.getUserBilling = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "patient") {
      query = { patient: req.user.id };
    } else if (req.user.role === "admin" || req.user.role === "doctor") {
      // Admin and doctors can see all billing records
      query = {};
    } else {
      return res.status(403).json({ msg: "Access denied" });
    }

    const billings = await Billing.find(query).populate("patient", "name");

    // Decrypt billing data before sending
    const decryptedBillings = billings.map((billing) => ({
      ...billing.toObject(),
      amount: decrypt(billing.amount),
      description: billing.description ? decrypt(billing.description) : "",
    }));

    res.json(decryptedBillings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update billing status
exports.updateBillingStatus = async (req, res) => {
  const { status } = req.body;

  try {
    let billing = await Billing.findById(req.params.id);
    if (!billing) {
      return res.status(404).json({ msg: "Billing record not found" });
    }

    // Check authorization
    if (
      req.user.role === "patient" &&
      billing.patient.toString() !== req.user.id
    ) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    billing = await Billing.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    res.json(billing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
