const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

// Health check
app.get("/api/health", (req, res) => {
	res.status(200).json({ message: "API is running" });
});

module.exports = app;
