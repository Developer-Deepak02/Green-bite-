"use client";

import Link from "next/link";

import { Globe, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const footerLinks = {
  company: [
    {
      name: 'About Us',
      href: '/about',
    },
    {
      name: 'Careers',
      href: '/careers',
    },
    {
      name: 'Our Chefs',
      href: '/chefs',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
  ],

  support: [
    {
      name: 'Contact Us',
      href: '/contact',
    },
    {
      name: 'Track Order',
      href: '/orders',
    },
    {
      name: 'Terms & Conditions',
      href: '/terms',
    },
    {
      name: 'Privacy Policy',
      href: '/privacy-policy',
    },
  ],

  menu: [
    {
      name: 'Pizza',
      href: '/menu',
    },
    {
      name: 'Burger',
      href: '/menu',
    },
    {
      name: 'Pasta',
      href: '/menu',
    },
    {
      name: 'Desserts',
      href: '/menu',
    },
  ],
};
export default function Footer() {
	return (
    <footer
      className="
				relative
				overflow-hidden
				border-t border-white/10
				bg-[#081120]
			"
    >
      {/* BACKGROUND */}

      <div
        className="
					absolute
					inset-0
					bg-[radial-gradient(circle_at_bottom,rgba(249,115,22,0.08),transparent_35%)]
					pointer-events-none
				"
      />

      <div
        className="
					relative z-10
					px-4
					md:px-8
					xl:px-12
					pt-24
					pb-10
				"
      >
        {/* TOP GRID */}

        <div
          className="
						grid
						grid-cols-1
						sm:grid-cols-2
						xl:grid-cols-5
						gap-10
						xl:gap-12
						pb-16
						border-b border-white/10
					"
        >
          {/* BRAND */}

          <div className="xl:col-span-2">
            <div className="space-y-6">
              {/* LOGO */}

              <div>
                <h2
                  className="
										text-4xl
										font-black
										tracking-tight
										text-white
									"
                >
                  Bite
                  <span className="text-orange-500">Rush</span>
                </h2>

                <p
                  className="
										mt-2
										text-sm
										text-gray-500
										uppercase
										tracking-[0.3em]
									"
                >
                  Fresh • Fast • Delivered
                </p>
              </div>

              {/* DESCRIPTION */}

              <p
                className="
									text-gray-400
									leading-relaxed
									max-w-md
								"
              >
                Experience premium handcrafted meals prepared with fresh
                ingredients and delivered with lightning-fast service directly
                to your doorstep.
              </p>

              {/* SOCIALS */}

              <div className="flex items-center gap-4">
                {[Globe, Globe].map((Icon, index) => (
                  <button
                    key={index}
                    className="
											w-12 h-12
											rounded-2xl
											bg-white/[0.03]
											border border-white/10
											backdrop-blur-xl
											flex items-center justify-center
											text-gray-400
											hover:bg-orange-500
											hover:border-orange-500
											hover:text-white
											transition-all duration-300
										"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* COMPANY */}

          <div>
            <h3
              className="
								text-white
								font-bold
								text-lg
								mb-6
							"
            >
              Company
            </h3>

            <div
              className="
								grid
								grid-cols-2
								sm:grid-cols-1
								gap-x-6
								gap-y-4
							"
            >
              {footerLinks.company.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="
										group
										flex items-center gap-2
										text-gray-400
										hover:text-orange-500
										transition-colors duration-300
									"
                >
                  <ArrowRight
                    className="
											w-4 h-4
											opacity-0
											-group-hover:translate-x-1
											group-hover:opacity-100
											transition-all duration-300
										"
                  />

                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* SUPPORT */}

          <div>
            <h3
              className="
								text-white
								font-bold
								text-lg
								mb-6
							"
            >
              Support
            </h3>

            <div
              className="
								grid
								grid-cols-2
								sm:grid-cols-1
								gap-x-6
								gap-y-4
							"
            >
              {footerLinks.support.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="
										group
										flex items-center gap-2
										text-gray-400
										hover:text-orange-500
										transition-colors duration-300
									"
                >
                  <ArrowRight
                    className="
											w-4 h-4
											opacity-0
											group-hover:translate-x-1
											group-hover:opacity-100
											transition-all duration-300
										"
                  />

                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}

          <div>
            <h3
              className="
								text-white
								font-bold
								text-lg
								mb-6
							"
            >
              Contact
            </h3>

            <div
              className="
								grid
								grid-cols-1
								sm:grid-cols-2
								xl:grid-cols-1
								gap-5
							"
            >
              <div className="flex items-start gap-3">
                <div
                  className="
										w-10 h-10
										rounded-xl
										bg-orange-500/10
										border border-orange-500/20
										flex items-center justify-center
										flex-shrink-0
									"
                >
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>

                <p className="text-gray-400 leading-relaxed">
                  Shimla, Himachal Pradesh, India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="
										w-10 h-10
										rounded-xl
										bg-orange-500/10
										border border-orange-500/20
										flex items-center justify-center
										flex-shrink-0
									"
                >
                  <Phone className="w-5 h-5 text-orange-500" />
                </div>

                <p className="text-gray-400">+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="
										w-10 h-10
										rounded-xl
										bg-orange-500/10
										border border-orange-500/20
										flex items-center justify-center
										flex-shrink-0
									"
                >
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>

                <p className="text-gray-400">hello@biterush.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div
          className="
						pt-8
						flex
						flex-col
						md:flex-row
						items-center
						justify-between
						gap-4
					"
        >
          <p className="text-sm text-gray-500 text-center md:text-left">
            © 2026 BiteRush. All rights reserved.
          </p>

          <div
            className="
							flex
							flex-wrap
							items-center
							justify-center
							md:justify-end
							gap-5
						"
          >
            <Link
              href="/privacy-policy"
              className="
								text-sm
								text-gray-500
								hover:text-orange-500
								transition-colors duration-300
							"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="
								text-sm
								text-gray-500
								hover:text-orange-500
								transition-colors duration-300
							"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
