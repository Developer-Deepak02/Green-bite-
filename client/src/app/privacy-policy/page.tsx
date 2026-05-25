'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

import { ShieldCheck, Lock, Eye, Database, Cookie, Bell } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content:
        'BiteRush may collect personal information such as your name, email address, phone number, delivery address, and payment-related details when you place orders or create an account.',
    },
    {
      icon: Lock,
      title: 'How We Protect Your Data',
      content:
        'We implement secure technologies and encrypted payment gateways to protect your personal information from unauthorized access, misuse, or disclosure.',
    },
    {
      icon: Eye,
      title: 'How We Use Information',
      content:
        'Your information is used to process orders, improve customer experience, provide support, send important updates, and enhance our food delivery services.',
    },
    {
      icon: Cookie,
      title: 'Cookies & Tracking',
      content:
        'BiteRush may use cookies and analytics tools to improve website functionality, remember preferences, and analyze platform performance.',
    },
    {
      icon: Bell,
      title: 'Notifications & Communication',
      content:
        'We may send order confirmations, delivery updates, promotional offers, and important service notifications through email or SMS.',
    },
    {
      icon: ShieldCheck,
      title: 'Your Privacy Rights',
      content:
        'Users can request account updates, data corrections, or account deletion by contacting the BiteRush support team directly.',
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
              <ShieldCheck className="w-4 h-4" />
              Privacy & Security
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              Privacy
              <span className="block text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.35)]">
                Policy
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-7 text-lg text-gray-400 leading-relaxed">
              BiteRush values your privacy and is committed to protecting your
              personal information. This policy explains how we collect, use,
              and safeguard your data.
            </p>
          </div>
        </section>

        {/* INTRO */}

        <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-16">
          <div
            className="
              max-w-6xl
              mx-auto
              rounded-[40px]
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
              p-8 md:p-12
            "
          >
            <h2 className="text-3xl md:text-4xl font-black">
              Your Trust Matters
            </h2>

            <p className="text-gray-400 leading-relaxed mt-6 text-lg">
              By using BiteRush services, you agree to the collection and use of
              information in accordance with this Privacy Policy. We prioritize
              transparency, security, and responsible handling of customer data
              across our platform.
            </p>
          </div>
        </section>

        {/* POLICY SECTIONS */}

        <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-7">
            {sections.map((section, index) => {
              const Icon = section.icon;

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
                    <Icon className="w-8 h-8 text-orange-400" />
                  </div>

                  <h2 className="text-2xl font-black">{section.title}</h2>

                  <p className="text-gray-400 mt-5 leading-relaxed text-lg">
                    {section.content}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXTRA */}

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
                <ShieldCheck className="w-9 h-9 text-orange-300" />
              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Secure Food Ordering
                <span className="block text-orange-300">
                  With Trusted Protection
                </span>
              </h2>

              <p className="text-orange-100/80 max-w-3xl mx-auto mt-7 text-lg leading-relaxed">
                BiteRush continuously improves security practices to ensure safe
                transactions, reliable account protection, and complete customer
                trust across the platform.
              </p>

              <p className="text-sm text-orange-100/60 mt-8">
                Last Updated: 2026
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
