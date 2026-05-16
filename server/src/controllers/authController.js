const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendEmail = require("../emails/sendEmail");

const welcomeTemplate = require("../emails/templates/welcomeTemplate");

// ================= GENERATE JWT TOKEN =================
const generateToken = (user) => {
	return jwt.sign(
		{
			id: user._id,
			role: user.role,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "7d",
		},
	);
};

// ================= REGISTER =================
exports.registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Validate fields
		if (!name || !email || !password) {
			return res.status(400).json({
				message: "All fields are required",
			});
		}

		// Prevent duplicate users
		const existingUser = await User.findOne({
			email,
		});

		if (existingUser) {
			return res.status(400).json({
				message: "User already exists",
			});
		}

		// Hash password before saving
		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);

		// Create user
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		// ================= SEND WELCOME EMAIL =================

		await sendEmail({
			to: user.email,
			subject: "Welcome to Greenbite 🍔",
			html: welcomeTemplate({
				name: user.name,
			}),
		});

		// ================= RESPONSE =================

		res.status(201).json({
			message: "User registered successfully",

			token: generateToken(user),

			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validate fields
		if (!email || !password) {
			return res.status(400).json({
				message: "Email and password are required",
			});
		}

		// Find user
		const user = await User.findOne({
			email,
		});

		if (!user) {
			return res.status(400).json({
				message: "Invalid credentials",
			});
		}

		// Compare password
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({
				message: "Invalid credentials",
			});
		}

		// ================= RESPONSE =================

		res.status(200).json({
			message: "Login successful",

			token: generateToken(user),

			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
