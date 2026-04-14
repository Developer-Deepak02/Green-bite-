const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);

// CORS configuration
app.use(
	cors({
		origin: "http://localhost:3000",
	}),
);

// Health check
app.get("/api/health", (req, res) => {
	res.status(200).json({ message: "API is running" });
});

module.exports = app;
