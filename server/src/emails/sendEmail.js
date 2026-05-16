const transporter = require("../config/email");

const sendEmail = async ({ to, subject, html }) => {
	try {
		await transporter.sendMail({
			from: `"BiteRush" <${process.env.EMAIL_USER}>`,
			to,
			subject,
			html,
		});

		console.log("Email sent");
	} catch (error) {
		console.error("Email error:", error.message);
	}
};

module.exports = sendEmail;
