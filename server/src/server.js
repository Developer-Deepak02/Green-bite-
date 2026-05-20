require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
// ================= DATABASE =================
connectDB();

// ================= STATIC UPLOADS =================

app.use(
	"/uploads",
	require("express").static(
		path.join(__dirname, "../uploads"),
	),
);
// ================= SWAGGER CONFIG =================

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "BiteRush API",
			version: "1.0.0",
			description: "API documentation for BiteRush Food Delivery Backend",
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT || 5000}`,
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},

		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// ================= SWAGGER ROUTE =================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
