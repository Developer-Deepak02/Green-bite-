'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

import { ChefHat, Star, Award, UtensilsCrossed, Flame } from 'lucide-react';

export default function OurChefsPage() {
  const chefs = [
    {
      name: 'Chef Arjun Mehta',
      role: 'Head Executive Chef',
      specialty: 'Italian & Continental Cuisine',
      experience: '12 Years Experience',
    },
    {
      name: 'Chef Riya Kapoor',
      role: 'Dessert Specialist',
      specialty: 'Premium Desserts & Bakery',
      experience: '8 Years Experience',
    },
    {
      name: 'Chef Kabir Sharma',
      role: 'Indian Cuisine Expert',
      specialty: 'North Indian & Mughlai',
      experience: '10 Years Experience',
    },
    {
      name: 'Chef Neha Verma',
      role: 'Healthy Food Specialist',
      specialty: 'Salads & Nutrition Meals',
      experience: '7 Years Experience',
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020817] text-white overflow-hidden">
        {/* BACKGROUND */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_35%)] pointer-events-none" />

        {/* HERO */}

        <section className="relative z-10 pt-28 pb-20 px-4 md:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-5 py-2
                rounded-full
                border border-orange-500/20
                bg-orange-500/10
                text-orange-400
                text-sm
                font-medium
                mb-6
              "
            >
              <ChefHat className="w-4 h-4" />
              Meet Our Expert Chefs
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              Culinary Experts Behind
              <span className="block text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.35)]">
                BiteRush
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-7 text-lg text-gray-400 leading-relaxed">
              Our professional chefs craft every dish with passion, precision,
              and premium ingredients to deliver unforgettable food experiences.
            </p>
          </div>
        </section>

        {/* STATS */}

        <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 text-center">
              <h2 className="text-4xl font-black text-orange-500">15+</h2>

              <p className="text-gray-400 mt-3">Professional Chefs</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 text-center">
              <h2 className="text-4xl font-black text-orange-500">50+</h2>

              <p className="text-gray-400 mt-3">Signature Dishes</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 text-center">
              <h2 className="text-4xl font-black text-orange-500">4.9★</h2>

              <p className="text-gray-400 mt-3">Food Quality Rating</p>
            </div>
          </div>
        </section>

        {/* CHEFS */}

        <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-28">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
              {chefs.map((chef, index) => (
                <div
                  key={index}
                  className="
                    rounded-[32px]
                    border border-white/10
                    bg-white/[0.03]
                    backdrop-blur-2xl
                    overflow-hidden
                    hover:border-orange-500/20
                    transition-all duration-300
                  "
                >
                  {/* IMAGE PLACEHOLDER */}

                  <div
                    className="
                      h-[320px]
                      bg-gradient-to-br
                      from-orange-500/20
                      to-orange-900/10
                      flex items-center justify-center
                      border-b border-white/10
                    "
                  >
                    <div
                      className="
                        w-28 h-28
                        rounded-full
                        bg-orange-500/10
                        border border-orange-500/20
                        flex items-center justify-center
                      "
                    >
                      <ChefHat className="w-14 h-14 text-orange-400" />
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />

                      <span className="text-sm text-orange-400 font-medium">
                        Top Rated Chef
                      </span>
                    </div>

                    <h2 className="text-2xl font-black">{chef.name}</h2>

                    <p className="text-orange-400 mt-2 font-medium">
                      {chef.role}
                    </p>

                    <div className="space-y-4 mt-6">
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
                          <UtensilsCrossed className="w-5 h-5 text-orange-400" />
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Specialty</p>

                          <p className="text-gray-300 mt-1">{chef.specialty}</p>
                        </div>
                      </div>

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
                          <Award className="w-5 h-5 text-orange-400" />
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Experience</p>

                          <p className="text-gray-300 mt-1">
                            {chef.experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM SECTION */}

        <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-28">
          <div className="max-w-6xl mx-auto">
            <div
              className="
                rounded-[40px]
                border border-orange-500/20
                bg-orange-500/10
                p-10 md:p-16
                text-center
              "
            >
              <div
                className="
                  w-20 h-20
                  rounded-full
                  bg-white/10
                  border border-white/10
                  flex items-center justify-center
                  mx-auto mb-8
                "
              >
                <Flame className="w-9 h-9 text-orange-300" />
              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Crafted With Passion
                <span className="block text-orange-300">
                  Served With Excellence
                </span>
              </h2>

              <p className="text-orange-100/80 max-w-3xl mx-auto mt-7 text-lg leading-relaxed">
                Every BiteRush meal is prepared with premium ingredients,
                culinary expertise, and a dedication to delivering exceptional
                flavors directly to your doorstep.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
