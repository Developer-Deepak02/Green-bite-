'use client';

import { useEffect, useState } from 'react';

import {
  MessageSquare,
  Mail,
  User,
  Calendar,
  Loader2,
  Search,
} from 'lucide-react';

import { toast } from 'sonner';

interface ContactMessage {
  _id: string;

  name: string;

  email: string;

  subject: string;

  message: string;

  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');

  // FETCH MESSAGES

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/contact`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch messages');
        }

        setMessages(data.messages || []);
      } catch (error: any) {
        console.error(error);

        toast.error(error.message || 'Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // FILTERED MESSAGES

  const filteredMessages = messages.filter((msg) => {
    const value = search.toLowerCase();

    return (
      msg.name.toLowerCase().includes(value) ||
      msg.email.toLowerCase().includes(value) ||
      msg.subject.toLowerCase().includes(value)
    );
  });

  // LOADING

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-5">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>

          <h2 className="text-2xl font-bold text-white">Loading Messages</h2>

          <p className="text-gray-400 mt-2">Please wait a moment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      {/* BACKGROUND */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 p-6 md:p-8">
        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <p className="text-orange-400 text-sm font-medium mb-3">
              BiteRush Admin
            </p>

            <h1 className="text-4xl font-black tracking-tight">
              Customer Messages
            </h1>
          </div>

          {/* SEARCH */}

          <div className="relative w-full md:w-[340px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-14
                pl-12
                pr-5
                rounded-2xl
                bg-white/[0.03]
                border border-white/10
                backdrop-blur-xl
                text-white
                outline-none
                focus:border-orange-500/50
              "
            />
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Messages</p>

                <h2 className="text-3xl font-black mt-3">{messages.length}</h2>
              </div>

              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-orange-500/10
                  border border-orange-500/20
                  flex items-center justify-center
                "
              >
                <MessageSquare className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          <div
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Filtered Results</p>

                <h2 className="text-3xl font-black mt-3">
                  {filteredMessages.length}
                </h2>
              </div>

              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-blue-500/10
                  border border-blue-500/20
                  flex items-center justify-center
                "
              >
                <Search className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Support Requests</p>

                <h2 className="text-3xl font-black mt-3">Active</h2>
              </div>

              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-green-500/10
                  border border-green-500/20
                  flex items-center justify-center
                "
              >
                <Mail className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* MESSAGES */}

        <div className="space-y-6">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message._id}
                className="
                  rounded-[32px]
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-2xl
                  p-7
                "
              >
                {/* TOP */}

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          w-12 h-12
                          rounded-2xl
                          bg-orange-500/10
                          border border-orange-500/20
                          flex items-center justify-center
                        "
                      >
                        <User className="w-5 h-5 text-orange-400" />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold">{message.name}</h2>

                        <p className="text-gray-400 text-sm">{message.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />

                    {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* SUBJECT */}

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-orange-400">
                    {message.subject}
                  </h3>
                </div>

                {/* MESSAGE */}

                <div
                  className="
                    mt-5
                    rounded-2xl
                    bg-[#0B1220]
                    border border-white/5
                    p-5
                  "
                >
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {message.message}
                  </p>
                </div>

                {/* ACTIONS */}

                <div className="flex flex-wrap gap-4 mt-6">
                  <a
                    href={`mailto:${message.email}`}
                    className="
                      h-11
                      px-5
                      rounded-2xl
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      font-semibold
                      flex items-center gap-2
                      transition-all duration-300
                    "
                  >
                    <Mail className="w-4 h-4" />
                    Reply
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div
              className="
                rounded-[32px]
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-2xl
                p-14
                text-center
              "
            >
              <div
                className="
                  w-20 h-20
                  rounded-full
                  bg-orange-500/10
                  border border-orange-500/20
                  flex items-center justify-center
                  mx-auto mb-6
                "
              >
                <MessageSquare className="w-8 h-8 text-orange-400" />
              </div>

              <h2 className="text-3xl font-black">No Messages Found</h2>

              <p className="text-gray-400 mt-3">
                No customer messages available right now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
