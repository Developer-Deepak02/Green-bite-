'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

import {
  FileText,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  Ban,
  AlertTriangle,
} from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      icon: ShoppingBag,
      title: 'Orders & Deliveries',
      content:
        'Customers are responsible for providing accurate delivery details. Delivery times may vary depending on traffic, weather, and restaurant preparation times.',
    },
    {
      icon: CreditCard,
      title: 'Payments',
      content:
        'All payments processed through BiteRush are secured using trusted payment gateways. Cash on Delivery may be available for selected locations.',
    },
    {
      icon: ShieldCheck,
      title: 'Account Responsibility',
      content:
        'Users are responsible for maintaining the confidentiality of their account credentials and all activities performed under their accounts.',
    },
    {
      icon: Ban,
      title: 'Prohibited Activities',
      content:
        'Any misuse of the platform including fraudulent orders, abusive behavior, spam, or unauthorized access attempts may result in account suspension.',
    },
    {
      icon: AlertTriangle,
      title: 'Cancellation & Refunds',
      content:
        'Orders may only be cancelled before preparation begins. Refund eligibility depends on payment status, service issues, and company policies.',
    },
    {
      icon: FileText,
      title: 'Policy Updates',
      content:
        'BiteRush reserves the right to modify these terms at any time. Continued use of the platform means acceptance of updated terms.',
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
              <FileText className="w-4 h-4" />
              Legal Information
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              Terms &
              <span className="block text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.35)]">
                Conditions
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-7 text-lg text-gray-400 leading-relaxed">
              These Terms & Conditions govern the use of BiteRush services,
              including food ordering, payments, deliveries, and account usage.
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
              Agreement To Use Services
            </h2>

            <p className="text-gray-400 leading-relaxed mt-6 text-lg">
              By accessing or using BiteRush, you agree to comply with these
              Terms & Conditions. Users who do not agree with any part of these
              terms should discontinue use of the platform immediately.
            </p>
          </div>
        </section>

        {/* TERMS */}

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

        {/* FOOT NOTE */}

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
                Fair Usage &
                <span className="block text-orange-300">Secure Experience</span>
              </h2>

              <p className="text-orange-100/80 max-w-3xl mx-auto mt-7 text-lg leading-relaxed">
                BiteRush is committed to maintaining a safe, reliable, and
                transparent platform for customers, restaurant partners, and
                delivery services.
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
