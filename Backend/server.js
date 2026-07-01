const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const app = express();

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// =========================
// Routes
// =========================
app.get("/", (req, res) => {
  res.send("🚀 Employee Management API Running");
});

app.use("/employees", employeeRoutes);

// =========================
// MongoDB Connection
// =========================
const MONGO_URI =
  "mongodb+srv://jakharharpreet94_db_user:Harpreet123@cluster0.66o4tug.mongodb.net/studentDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});