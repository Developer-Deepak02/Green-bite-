const orderConfirmationTemplate = ({ name, order }) => {
	return `
		<h2>Order Confirmed 🍔</h2>

		<p>Hello ${name},</p>

		<p>Your order has been placed successfully.</p>

		<h3>Order Details:</h3>

		<ul>
			${order.items
				.map(
					(item) => `
						<li>
							${item.name} × ${item.quantity}
						</li>
					`,
				)
				.join("")}
		</ul>

		<p>
			<strong>Total:</strong>
			₹${order.totalAmount}
		</p>

		<p>
			Status:
			<strong>${order.status}</strong>
		</p>

		<p>
			Thank you for ordering from Greenbite ❤️
		</p>
	`;
};

module.exports = orderConfirmationTemplate;
