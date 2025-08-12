const Appointment = require("../models/Appointment");

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { doctor, date } = req.body;
  try {
    const newAppointment = new Appointment({
      patient: req.user.id,
      doctor,
      date,
    });
    const appointment = await newAppointment.save();
    // In a real app, you'd emit a socket event here to notify the doctor
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all appointments for a user (patient or doctor)
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [{ patient: req.user.id }, { doctor: req.user.id }],
    }).populate("patient doctor", "name");
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  const { status } = req.body;
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // Make sure user owns appointment or is a doctor
    if (
      appointment.patient.toString() !== req.user.id &&
      req.user.role !== "doctor"
    ) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // Make sure user owns appointment
    if (appointment.patient.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Appointment.findByIdAndRemove(req.params.id);

    res.json({ msg: "Appointment removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
