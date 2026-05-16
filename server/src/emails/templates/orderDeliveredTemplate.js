const orderDeliveredTemplate = ({ name, order }) => {
	return `
		<div style="font-family: Arial; padding: 20px;">
			<h1>Order Delivered 🎉</h1>

			<p>Hello ${name},</p>

			<p>
				Your order has been delivered successfully.
			</p>

			<h3>Order Summary</h3>

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
				<strong>Total:</strong> ₹${order.totalAmount}
			</p>

			<hr />

			<h3>Enjoyed your meal? 🍕</h3>

			<p>
				Please leave a review and rating
				for your ordered items.
			</p>

			<p>
				Your feedback helps us improve ❤️
			</p>

			<h3>Team Greenbite</h3>
		</div>
	`;
};

module.exports = orderDeliveredTemplate;
