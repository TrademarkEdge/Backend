const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const contactRoutes = require("./src/routers/contactRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} route hit`);
  next();
});

// "/" route for Hello
app.get("/", (req, res) => {
  res.send("Hello");
});

// API routes
app.use("/api", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
