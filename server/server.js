const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
require("dotenv").config({ path: "../.env" });

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/records", require("./routes/records"));
app.use("/api/billing", require("./routes/billing"));

// Socket.io
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join a room for private messaging
  socket.on("join", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Handle sending messages
  socket.on("sendMessage", ({ roomId, message }) => {
    // Broadcast to all clients in the room except sender
    socket.to(roomId).emit("message", message);
    console.log(`Message sent to room ${roomId}:`, message.text);
  });

  // Handle appointment notifications
  socket.on("appointmentBooked", ({ doctorId, appointmentData }) => {
    // Notify the specific doctor
    socket.to(`doctor-${doctorId}`).emit("newAppointment", appointmentData);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));
