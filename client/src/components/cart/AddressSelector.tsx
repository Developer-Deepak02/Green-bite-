"use client";

import { MapPin, Check } from "lucide-react";

interface Address {
	_id: string;
	fullName: string;
	street: string;
	city: string;
	state: string;
	pincode: string;
	phone?: string;
}

interface AddressSelectorProps {
	addresses: Address[] | any;

	selectedAddress: string | null;

	onSelect: (id: string) => void;

	onAddAddress?: () => void;
}

export default function AddressSelector({
	addresses,
	selectedAddress,
	onSelect,
	onAddAddress,
}: AddressSelectorProps) {
	/* FIX INVALID DATA */

	const safeAddresses = Array.isArray(addresses)
		? addresses
		: Array.isArray(addresses?.addresses)
			? addresses.addresses
			: [];

	return (
		<div
			className="
				rounded-[32px]
				border border-white/10
				bg-white/[0.03]
				backdrop-blur-2xl
				p-6
				md:p-7
			"
		>
			{/* HEADER */}

			<div className="flex items-center justify-between gap-4 mb-7">
				<div>
					<div
						className="
							inline-flex
							items-center
							gap-2
							bg-orange-500/10
							border border-orange-500/20
							text-orange-400
							px-4 py-2
							rounded-full
							text-sm
							font-medium
							mb-4
						"
					>
						<MapPin className="w-4 h-4" />
						Delivery Address
					</div>

					<h2
						className="
							text-3xl
							font-black
							text-white
							leading-tight
						"
					>
						Choose
						<span className="text-orange-500"> Address</span>
					</h2>
				</div>

				{onAddAddress && (
					<button
						onClick={onAddAddress}
						className="
							h-12
							px-5
							rounded-2xl
							bg-orange-500
							hover:bg-orange-600
							text-white
							font-semibold
							transition-all duration-300
							shadow-lg shadow-orange-500/20
						"
					>
						Add New
					</button>
				)}
			</div>

			{/* EMPTY STATE */}

			{safeAddresses.length === 0 ? (
				<div
					className="
						border border-dashed border-white/10
						rounded-3xl
						p-10
						text-center
					"
				>
					<div
						className="
							w-16
							h-16
							mx-auto
							rounded-2xl
							bg-orange-500/10
							border border-orange-500/20
							flex items-center justify-center
							mb-5
						"
					>
						<MapPin className="w-7 h-7 text-orange-400" />
					</div>

					<h3
						className="
							text-2xl
							font-bold
							text-white
							mb-3
						"
					>
						No Address Found
					</h3>

					<p
						className="
							text-gray-400
							max-w-md
							mx-auto
							leading-relaxed
						"
					>
						Add a delivery address to continue with your order.
					</p>
				</div>
			) : (
				<div className="space-y-4">
					{safeAddresses.map((addr: Address) => {
						const active = selectedAddress === addr._id;

						return (
							<button
								key={addr._id}
								onClick={() => onSelect(addr._id)}
								className={`
									w-full
									text-left
									rounded-[28px]
									border
									p-5
									md:p-6
									transition-all duration-300
									relative
									overflow-hidden
									${
										active
											? `
												border-orange-500/40
												bg-orange-500/[0.08]
												shadow-[0_10px_40px_rgba(249,115,22,0.12)]
											`
											: `
												border-white/10
												bg-white/[0.02]
												hover:border-white/20
												hover:bg-white/[0.04]
											`
									}
								`}
							>
								{/* ACTIVE INDICATOR */}

								{active && (
									<div
										className="
											absolute
											top-4
											right-4
											w-8
											h-8
											rounded-full
											bg-orange-500
											flex items-center justify-center
											text-white
										"
									>
										<Check className="w-4 h-4" />
									</div>
								)}

								<div className="space-y-4">
									<div>
										<h3
											className="
												text-xl
												font-bold
												text-white
											"
										>
											{addr.fullName}
										</h3>

										{addr.phone && (
											<p
												className="
													text-sm
													text-gray-500
													mt-1
												"
											>
												{addr.phone}
											</p>
										)}
									</div>

									<div
										className="
											text-gray-400
											leading-relaxed
										"
									>
										<p>{addr.street}</p>

										<p>
											{addr.city}, {addr.state}
										</p>

										<p>{addr.pincode}</p>
									</div>
								</div>
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
  