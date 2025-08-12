const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillingSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amount: {
    type: String, // Encrypted
    required: true,
  },
  description: {
    type: String, // Encrypted
  },
  status: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Billing = mongoose.model("billing", BillingSchema);
