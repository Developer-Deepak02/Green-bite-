const Address = require("../models/Address");

// Add Address (MAX 3)
exports.addAddress = async (req, res) => {
	try {
		const count = await Address.countDocuments({ user: req.user.id });

		if (count >= 3) {
			return res.status(400).json({
				message: "You can only save up to 3 addresses",
			});
		}

		const address = await Address.create({
			user: req.user.id,
			...req.body,
		});

		res.status(201).json(address);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get Addresses
exports.getAddresses = async (req, res) => {
	try {
		const addresses = await Address.find({ user: req.user.id });
		res.json(addresses);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete Address
exports.deleteAddress = async (req, res) => {
	try {
		await Address.findByIdAndDelete(req.params.id);
		res.json({ message: "Address deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
