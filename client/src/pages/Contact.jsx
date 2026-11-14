import { useState } from "react";
import { sendContactMessage } from "../services/contactService";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  Clock,
  HelpCircle,
  Lightbulb,
  Users,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const contactOptions = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Have a question? We'd love to hear from you.",
    detail: "Reach out to the Code-A-Nova team.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: MessageCircle,
    title: "General Enquiries",
    description: "Need help with something related to the event?",
    detail: "Send us your questions using the contact form.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: Clock,
    title: "We're Here to Help",
    description: "Our team is ready to assist participants.",
    detail: "Get in touch whenever you need assistance.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
];

const faqs = [
  {
    question: "Who can participate in Code-A-Nova?",
    answer:
      "Check the official registration guidelines for eligibility and participation requirements.",
  },
  {
    question: "How can I register for the hackathon?",
    answer:
      "Visit the registration page, create your account, and complete the hackathon registration process.",
  },
  {
    question: "What if I face technical issues during registration?",
    answer:
      "Use the contact form to describe your issue so the organizing team can assist you.",
  },
  {
    question: "Can I contact the organizers for general queries?",
    answer:
      "Absolutely! Send your query through the contact form and the team can help you.",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setStatus({
      type: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setStatus({
        type: "success",
        message: response.message || "Your message has been sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
        <div className="absolute top-[35%] -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[130px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      {/* Hero */}
      <section className="relative px-6 pb-16 pt-28 text-center sm:pt-36">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300 backdrop-blur-xl">
          <Sparkles size={15} />
          Let's Connect
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Get in
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            Touch.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
          Have questions, ideas, or need assistance? We're just a message away.
          Connect with the Code-A-Nova team and let's make something
          extraordinary happen.
        </p>
      </section>

      {/* Contact options */}
      <section className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {contactOptions.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/30"
              >
                <div
                  className={`mb-6 inline-flex rounded-xl p-4 ${item.bg} ${item.color}`}
                >
                  <Icon size={27} />
                </div>

                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {item.description}
                </p>

                <p className="mt-5 text-sm text-gray-500">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact form */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Left information */}
          <div className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Contact Our Team
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              Let's Start a
              <span className="block text-cyan-400">Conversation.</span>
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              Whether you're curious about the hackathon, need registration
              assistance, or want to share an idea, we'd love to hear from you.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex gap-4">
                <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
                  <Users size={23} />
                </div>
                <div>
                  <h3 className="font-semibold">Participant Support</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Get assistance with your participation and registration.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                  <Code2 size={23} />
                </div>
                <div>
                  <h3 className="font-semibold">Technical Assistance</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Let us know if you encounter technical difficulties.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl bg-pink-500/10 p-3 text-pink-400">
                  <Lightbulb size={23} />
                </div>
                <div>
                  <h3 className="font-semibold">Ideas & Collaborations</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Share suggestions and opportunities with our team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl border border-white/10 bg-[#0b1024]/80 p-7 shadow-2xl shadow-violet-950/20 backdrop-blur-2xl sm:p-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold">Send Us a Message</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Fill out the form and tell us how we can help.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is your query about?"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/10"
                  />
                </div>

                {status.message && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`rounded-xl border p-4 text-sm leading-6 ${
                      status.type === "success"
                        ? "border-green-400/20 bg-green-400/5 text-green-300"
                        : "border-red-400/20 bg-red-400/5 text-red-300"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-semibold shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-1 hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? "Sending Message..." : "Send Message"}

                  <Send
                    size={18}
                    className={`transition-transform ${
                      loading ? "animate-pulse" : "group-hover:translate-x-1"
                    }`}
                  />
                </button>

                <p className="text-center text-xs text-gray-500">
                  Your information will be used to respond to your enquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-y border-white/5 bg-white/[0.015] py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Need Answers?
            </span>

            <h2 className="mt-5 text-3xl font-bold sm:text-5xl">
              Frequently Asked
              <span className="text-violet-400"> Questions.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all open:border-violet-400/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  <span className="flex items-center gap-3">
                    <HelpCircle
                      size={20}
                      className="shrink-0 text-violet-400"
                    />
                    {faq.question}
                  </span>

                  <span className="text-xl text-violet-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-5 pl-8 text-sm leading-7 text-gray-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/80 via-[#10102b] to-cyan-950/50 px-7 py-16 text-center">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-[90px]" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-[90px]" />

          <div className="relative">
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-400">
              <CheckCircle2 size={30} />
            </div>

            <h2 className="text-3xl font-bold sm:text-5xl">
              Ready to Be Part of
              <span className="block text-cyan-400">Something Bigger?</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl leading-7 text-gray-400">
              Stop waiting for the future. Start building it with Code-A-Nova.
            </p>

            <Link
              to="/register"
              className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-[#080b1b] transition-all hover:-translate-y-1 hover:bg-cyan-300"
            >
              Register Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
