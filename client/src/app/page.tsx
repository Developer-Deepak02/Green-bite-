import Link from "next/link";

export default function HomePage() {
	return (
		<div className="bg-background dark:bg-gray-900 text-text dark:text-white">
			{/*HERO SECTION */}
			<section
				className="px-4 pt-16 pb-20 text-center 
      bg-gradient-to-b from-gray-900 to-green-700 text-white"
			>
				<h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
					🍃 Fresh Food <br /> Delivered Fast
				</h1>

				<p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
					Healthy, tasty meals made with fresh ingredients and delivered to your
					door in minutes.
				</p>

				<Link
					href="/menu"
					className="inline-block bg-primary hover:bg-primary-dark 
          text-white px-8 py-4 rounded-xl text-lg font-semibold 
          shadow-lg hover:scale-105 transition"
				>
					Order Now 🚀
				</Link>

				{/* FOOD IMAGE */}
				<div className="mt-12 flex justify-center">
					<img
						src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						className="w-full h-40 object-cover"
					/>
				</div>
			</section>

			{/* CATEGORIES */}
			<section className="px-4 py-16 max-w-6xl mx-auto">
				<h2 className="text-3xl font-heading font-semibold text-center mb-10">
					Explore Categories
				</h2>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
					{[
						{ name: "Pizza", img: "pizza" },
						{ name: "Burger", img: "burger" },
						{ name: "Drinks", img: "juice" },
						{ name: "Desserts", img: "dessert" },
					].map((cat) => (
						<div
							key={cat.name}
							className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
						>
							<img
								src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								className="w-full h-40 object-cover"
							/>
							<div className="p-3 bg-white dark:bg-gray-800 text-center">
								<p className="font-medium">{cat.name}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* POPULAR DISHES */}
			<section className="px-4 py-16 bg-white dark:bg-gray-800">
				<h2 className="text-3xl font-heading font-semibold text-center mb-10">
					Popular Dishes
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
						>
							<img
								src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								
								className="w-full h-40 object-cover"
							/>

							<div className="p-4 bg-white dark:bg-gray-800">
								<h3 className="font-heading text-lg">Veg Pizza</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Loaded with cheese and fresh veggies
								</p>

								<div className="mt-3 flex justify-between items-center">
									<span className="text-primary font-semibold text-lg">
										₹199
									</span>

									<button className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded-lg text-sm transition">
										Add
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* WHY CHOOSE US */}
			<section className="px-4 py-16 max-w-6xl mx-auto">
				<h2 className="text-3xl font-heading font-semibold text-center mb-10">
					Why GreenBite?
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
					<div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
						<h3 className="text-xl mb-2">🚀 Fast Delivery</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Get your food in under 30 minutes.
						</p>
					</div>

					<div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
						<h3 className="text-xl mb-2">🥗 Fresh Ingredients</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Only high-quality fresh ingredients used.
						</p>
					</div>

					<div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
						<h3 className="text-xl mb-2">💚 Healthy Choices</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Balanced meals for better living.
						</p>
					</div>
				</div>
			</section>

			{/* 🚀 FINAL CTA */}
			<section className="px-4 py-20 text-center bg-primary text-white">
				<h2 className="text-3xl font-heading mb-4">
					Ready to order your favorite meal?
				</h2>

				<Link
					href="/menu"
					className="inline-block bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
				>
					Browse Menu
				</Link>
			</section>
		</div>
	);
}
