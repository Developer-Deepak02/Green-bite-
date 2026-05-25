'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

import { BookOpen, Clock3, ChefHat, Truck, ShieldCheck } from 'lucide-react';

export default function BlogPage() {
  const blogs = [
    {
      title: 'How BiteRush Ensures Fast Delivery',
      description:
        'Discover how our smart delivery system ensures fresh meals reach customers quickly and safely.',
      icon: Truck,
      date: 'March 2026',
      readTime: '4 min read',
    },
    {
      title: 'Behind The Scenes With Our Chefs',
      description:
        'Take a look at how our professional chefs prepare high-quality handcrafted meals every day.',
      icon: ChefHat,
      date: 'February 2026',
      readTime: '5 min read',
    },
    {
      title: 'Safe & Secure Online Payments',
      description:
        'Learn how BiteRush protects your transactions using secure payment gateways and encryption.',
      icon: ShieldCheck,
      date: 'January 2026',
      readTime: '3 min read',
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
          <div className="max-w-5xl mx-auto text-center">
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
              <BookOpen className="w-4 h-4" />
              BiteRush Blog
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              Latest
              <span className="block text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.35)]">
                Articles
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-7 text-lg text-gray-400 leading-relaxed">
              Explore food delivery insights, kitchen stories, customer
              experiences, and updates from the BiteRush platform.
            </p>
          </div>
        </section>

        {/* BLOGS */}

        <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-28">
          <div className="max-w-6xl mx-auto space-y-8">
            {blogs.map((blog, index) => {
              const Icon = blog.icon;

              return (
                <div
                  key={index}
                  className="
                    rounded-[32px]
                    border border-white/10
                    bg-white/[0.03]
                    backdrop-blur-2xl
                    p-8
                    hover:border-orange-500/20
                    transition-all duration-300
                  "
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* ICON */}

                    <div
                      className="
                        w-16 h-16
                        rounded-2xl
                        bg-orange-500/10
                        border border-orange-500/20
                        flex items-center justify-center
                        flex-shrink-0
                      "
                    >
                      <Icon className="w-8 h-8 text-orange-400" />
                    </div>

                    {/* CONTENT */}

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>{blog.date}</span>

                        <div className="flex items-center gap-1">
                          <Clock3 className="w-4 h-4" />

                          {blog.readTime}
                        </div>
                      </div>

                      <h2 className="text-3xl font-black leading-tight">
                        {blog.title}
                      </h2>

                      <p className="text-gray-400 mt-5 leading-relaxed text-lg">
                        {blog.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
