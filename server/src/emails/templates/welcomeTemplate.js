const welcomeTemplate = ({ name }) => {
	return `
		<div style="font-family: Arial; padding: 20px;">
			<h1>Welcome to Greenbite 🍔</h1>

			<p>Hello ${name},</p>

			<p>
				Thank you for joining Greenbite.
			</p>

			<p>
				You can now:
			</p>

			<ul>
				<li>Browse delicious food</li>
				<li>Place online orders</li>
				<li>Track your deliveries</li>
				<li>Review your favorite dishes</li>
			</ul>

			<p>
				We are excited to serve you ❤️
			</p>

			<h3>Team Greenbite</h3>
		</div>
	`;
};

module.exports = welcomeTemplate;
