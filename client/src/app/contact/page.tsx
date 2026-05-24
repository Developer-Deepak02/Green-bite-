'use client';

import { useState } from 'react';

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  CircleHelp,
  Loader2,
} from 'lucide-react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const faqs = [
    {
      question: 'How long does delivery take?',
      answer:
        'Most orders are delivered within 15-30 minutes depending on your location and order volume.',
    },
    {
      question: 'Can I cancel my order?',
      answer:
        'Yes, orders can be cancelled before they enter the preparation stage.',
    },
    {
      question: 'Do you offer refunds?',
      answer:
        'Refunds are available for failed payments, cancelled orders, or quality-related issues.',
    },
    {
      question: 'Is online payment secure?',
      answer:
        'Yes, all online payments are processed through secure encrypted payment gateways.',
    },
  ];

  // SUBMIT FORM

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('Message sent successfully');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-hidden">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_35%)] pointer-events-none" />

      {/* HERO */}

      <section className="relative z-10 pt-28 pb-16 px-4 md:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Contact BiteRush
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Get In{' '}
            <span className="text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              Touch
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We’re here to help you with orders, support, feedback, and
            partnerships. Reach out anytime and our team will assist you
            quickly.
          </p>
        </div>
      </section>

      {/* CONTACT INFO */}

      <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* EMAIL */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
              <Mail className="w-6 h-6 text-orange-500" />
            </div>

            <h3 className="text-xl font-bold">Email Us</h3>

            <p className="text-gray-400 mt-2 leading-relaxed">
              Get support anytime via email.
            </p>

            <p className="text-orange-400 mt-4 font-medium">
              support@biterush.com
            </p>
          </div>

          {/* PHONE */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
              <Phone className="w-6 h-6 text-orange-500" />
            </div>

            <h3 className="text-xl font-bold">Call Us</h3>

            <p className="text-gray-400 mt-2 leading-relaxed">
              Available 24/7 for urgent issues.
            </p>

            <p className="text-orange-400 mt-4 font-medium">+91 98765 43210</p>
          </div>

          {/* LOCATION */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
              <MapPin className="w-6 h-6 text-orange-500" />
            </div>

            <h3 className="text-xl font-bold">Location</h3>

            <p className="text-gray-400 mt-2 leading-relaxed">
              Serving customers across the city.
            </p>

            <p className="text-orange-400 mt-4 font-medium">
              Shimla, Himachal Pradesh
            </p>
          </div>

          {/* HOURS */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>

            <h3 className="text-xl font-bold">Working Hours</h3>

            <p className="text-gray-400 mt-2 leading-relaxed">
              We deliver every day without breaks.
            </p>

            <p className="text-orange-400 mt-4 font-medium">
              10:00 AM - 11:00 PM
            </p>
          </div>
        </div>
      </section>

      {/* FORM + SUPPORT */}

      <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* FORM */}

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-black">Send Us A Message</h2>

              <p className="text-gray-400 mt-3">
                Our support team usually replies within a few hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="
                    h-14
                    rounded-2xl
                    bg-[#0B1220]
                    border border-white/10
                    px-5
                    text-white
                    outline-none
                    focus:border-orange-500/50
                  "
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="
                    h-14
                    rounded-2xl
                    bg-[#0B1220]
                    border border-white/10
                    px-5
                    text-white
                    outline-none
                    focus:border-orange-500/50
                  "
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject: e.target.value,
                  })
                }
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-[#0B1220]
                  border border-white/10
                  px-5
                  text-white
                  outline-none
                  focus:border-orange-500/50
                "
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-2xl
                  bg-[#0B1220]
                  border border-white/10
                  p-5
                  text-white
                  outline-none
                  resize-none
                  focus:border-orange-500/50
                "
              />

              <Button
                type="submit"
                disabled={loading}
                className="
                  h-14
                  w-full
                  rounded-2xl
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  font-semibold
                  text-base
                  shadow-lg shadow-orange-500/20
                  disabled:opacity-70
                "
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* SUPPORT SIDE */}

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-green-400" />
              </div>

              <h2 className="text-3xl font-black">Trusted Customer Support</h2>

              <p className="text-gray-400 mt-4 leading-relaxed">
                Our dedicated support team ensures fast responses, secure
                transactions, and seamless food delivery experiences for every
                customer.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  24/7 Support Assistance
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Secure Online Payments
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Fast Refund Processing
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Live Order Tracking
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-orange-500/20 bg-orange-500/10 p-8">
              <h3 className="text-2xl font-black">Need Instant Help?</h3>

              <p className="text-orange-100/80 mt-3 leading-relaxed">
                Our live support agents are available to help you with urgent
                delivery or payment issues.
              </p>

              <Button
                className="
                  mt-6
                  h-12
                  rounded-2xl
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  font-semibold
                "
              >
                Chat With Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="relative z-10 px-4 md:px-8 xl:px-12 pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-sm font-medium mb-5">
              <CircleHelp className="w-4 h-4" />
              FAQs
            </div>

            <h2 className="text-4xl md:text-5xl font-black">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-7
                "
              >
                <h3 className="text-xl font-bold">{faq.question}</h3>

                <p className="text-gray-400 mt-3 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
