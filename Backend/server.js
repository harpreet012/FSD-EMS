const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const app = express();

// ==========================
// Middleware
// ==========================

app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);

// ==========================
// Routes
// ==========================

app.get("/", (req, res) => {
  res.send("Employee Management API Running 🚀");
});

app.use("/employees", employeeRoutes);

// ==========================
// Render + Localhost Port
// ==========================

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});