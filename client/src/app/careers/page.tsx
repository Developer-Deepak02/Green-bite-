'use client';

import {
  Briefcase,
  Rocket,
  HeartHandshake,
  Clock3,
  Star,
  Users,
  Coffee,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function CareersPage() {
  const positions = [
    {
      title: 'Frontend Developer',
      type: 'Full Time',
      location: 'Remote',
      description:
        'Build beautiful and fast user experiences for the BiteRush platform.',
    },
    {
      title: 'Backend Developer',
      type: 'Full Time',
      location: 'Hybrid',
      description:
        'Develop scalable APIs, payment systems, and delivery infrastructure.',
    },
    {
      title: 'UI/UX Designer',
      type: 'Remote',
      location: 'Remote',
      description:
        'Design premium food ordering experiences with modern interfaces.',
    },
    {
      title: 'Delivery Operations Manager',
      type: 'On Site',
      location: 'Shimla',
      description:
        'Manage delivery workflows and ensure lightning-fast customer service.',
    },
  ];

  const benefits = [
    {
      icon: Rocket,
      title: 'Fast Growth',
      description:
        'Work in a rapidly growing startup environment with huge opportunities.',
    },
    {
      icon: HeartHandshake,
      title: 'Healthy Culture',
      description:
        'A supportive and collaborative team focused on innovation and respect.',
    },
    {
      icon: Clock3,
      title: 'Flexible Work',
      description:
        'Remote-friendly workflows with flexibility and work-life balance.',
    },
    {
      icon: Coffee,
      title: 'Food Perks',
      description:
        'Exclusive employee discounts and free meal benefits for our team.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-hidden">
      <Navbar />
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
            <Briefcase className="w-4 h-4" />
            Careers At BiteRush
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Build The Future Of
            <span className="block text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.35)]">
              Food Delivery
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-7 text-lg text-gray-400 leading-relaxed">
            Join a passionate team focused on creating modern food experiences,
            ultra-fast delivery systems, and delightful customer journeys across
            India.
          </p>

          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
              <h2 className="text-4xl font-black text-orange-500">50+</h2>

              <p className="text-gray-400 mt-3">Team Members</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
              <h2 className="text-4xl font-black text-orange-500">15K+</h2>

              <p className="text-gray-400 mt-3">Orders Delivered</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
              <h2 className="text-4xl font-black text-orange-500">4.9★</h2>

              <p className="text-gray-400 mt-3">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}

      <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
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
                mb-5
              "
            >
              <Sparkles className="w-4 h-4" />
              Why Join Us
            </div>

            <h2 className="text-4xl md:text-5xl font-black">
              A Team That Moves Fast
            </h2>

            <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
              At BiteRush, we combine technology, food, and creativity to build
              experiences people love every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={index}
                  className="
                    rounded-[30px]
                    border border-white/10
                    bg-white/[0.03]
                    backdrop-blur-2xl
                    p-7
                    hover:border-orange-500/20
                    transition-all duration-300
                  "
                >
                  <div
                    className="
                      w-16 h-16
                      rounded-2xl
                      bg-orange-500/10
                      border border-orange-500/20
                      flex items-center justify-center
                      mb-6
                    "
                  >
                    <Icon className="w-7 h-7 text-orange-500" />
                  </div>

                  <h3 className="text-2xl font-bold">{benefit.title}</h3>

                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}

      <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
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
                mb-5
              "
            >
              <Users className="w-4 h-4" />
              Open Positions
            </div>

            <h2 className="text-4xl md:text-5xl font-black">Join Our Team</h2>
          </div>

          <div className="space-y-6">
            {positions.map((job, index) => (
              <div
                key={index}
                className="
                  rounded-[32px]
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-2xl
                  p-7 md:p-8
                  hover:border-orange-500/20
                  transition-all duration-300
                "
              >
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span
                        className="
                          px-4 py-1.5
                          rounded-full
                          bg-orange-500/10
                          border border-orange-500/20
                          text-orange-400
                          text-sm
                          font-medium
                        "
                      >
                        {job.type}
                      </span>

                      <span
                        className="
                          px-4 py-1.5
                          rounded-full
                          bg-white/[0.04]
                          border border-white/10
                          text-gray-300
                          text-sm
                        "
                      >
                        {job.location}
                      </span>
                    </div>

                    <h3 className="text-3xl font-black">{job.title}</h3>

                    <p className="text-gray-400 mt-4 leading-relaxed max-w-3xl">
                      {job.description}
                    </p>
                  </div>

                  <button
                    className="
                      h-14
                      px-7
                      rounded-2xl
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      font-semibold
                      flex items-center justify-center gap-2
                      transition-all duration-300
                      shadow-lg shadow-orange-500/20
                      whitespace-nowrap
                    "
                  >
                    View Details
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE */}

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
              <Star className="w-9 h-9 text-orange-300" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              We Believe Great Food
              <span className="block text-orange-300">
                Starts With Great People
              </span>
            </h2>

            <p className="text-orange-100/80 max-w-3xl mx-auto mt-7 text-lg leading-relaxed">
              BiteRush is built by passionate creators, engineers, chefs, and
              innovators working together to deliver amazing food experiences
              every single day.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
