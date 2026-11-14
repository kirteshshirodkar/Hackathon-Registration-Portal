
import {
  ArrowRight,
  Sparkles,
  Code2,
  Lightbulb,
  Users,
  Trophy,
  Rocket,
  Target,
  BrainCircuit,
  Laptop,
  Zap,
  ShieldCheck,
  Globe,
  Flag,
  Palette,
  Presentation,
} from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    icon: Lightbulb,
    title: "Think Beyond",
    description:
      "Explore unconventional ideas, challenge assumptions, and approach real-world problems with fresh perspectives.",
    color: "text-yellow-400",
    glow: "group-hover:shadow-yellow-500/10",
  },
  {
    icon: Code2,
    title: "Build Something",
    description:
      "Transform your ideas into working solutions through creativity, coding, and experimentation.",
    color: "text-cyan-400",
    glow: "group-hover:shadow-cyan-500/10",
  },
  {
    icon: Users,
    title: "Collaborate",
    description:
      "Connect with passionate individuals, exchange knowledge, and build innovative solutions together.",
    color: "text-violet-400",
    glow: "group-hover:shadow-violet-500/10",
  },
  {
    icon: Trophy,
    title: "Showcase Your Skills",
    description:
      "Present your work, demonstrate your technical abilities, and turn your ideas into opportunities.",
    color: "text-pink-400",
    glow: "group-hover:shadow-pink-500/10",
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: "Innovation First",
    description: "Think creatively and develop solutions that make a difference.",
  },
  {
    icon: Laptop,
    title: "Hands-on Building",
    description: "Learn by doing and turn concepts into practical applications.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together, share knowledge, and achieve more as a team.",
  },
  {
    icon: Globe,
    title: "Real-world Impact",
    description: "Focus on meaningful challenges and technology-driven solutions.",
  },
  {
    icon: Zap,
    title: "Creative Freedom",
    description: "Experiment with technologies and explore new possibilities.",
  },
  {
    icon: ShieldCheck,
    title: "Growth & Learning",
    description: "Challenge yourself and gain valuable development experience.",
  },
];

const journey = [
  {
    number: "01",
    title: "Imagine",
    subtitle: "Start with an idea",
    description:
      "Identify a problem, explore possibilities, and brainstorm creative solutions.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Create",
    subtitle: "Turn ideas into reality",
    description:
      "Plan your approach, choose your technologies, and start building your solution.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Innovate",
    subtitle: "Make it better",
    description:
      "Experiment, collaborate, refine your project, and overcome technical challenges.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Showcase",
    subtitle: "Present your vision",
    description:
      "Demonstrate your creation, communicate its impact, and share your journey.",
    icon: Presentation,
  },
];

function About() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
        <div className="absolute top-[40%] -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[130px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-28 text-center sm:pt-36">

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-5 py-2 text-sm text-violet-300 backdrop-blur-xl">
          <Sparkles size={15} />
          More Than Just A Hackathon
        </div>

        <h1 className="max-w-5xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Where Ideas Meet
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Innovation.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
          Welcome to Code-A-Nova, a space where creativity meets technology.
          Think boldly, collaborate with brilliant minds, and transform
          ambitious ideas into meaningful solutions.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/hackathon-registration"
            className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 font-semibold shadow-lg shadow-violet-600/25 transition-all hover:-translate-y-1 hover:shadow-violet-500/40"
          >
            Join the Hackathon
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <a
            href="#our-mission"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-gray-300 backdrop-blur-xl transition hover:border-violet-400/40 hover:bg-white/10"
          >
            Explore Our Mission
          </a>
        </div>

        <div className="mt-20 flex items-center gap-3 text-sm text-gray-500">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500" />
          DISCOVER CODE-A-NOVA
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
        </div>
      </section>

      {/* About / Mission */}
      <section id="our-mission" className="relative mx-auto max-w-7xl px-6 py-20">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Who We Are
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">
              Building Tomorrow,
              <span className="block text-violet-400">
                One Idea at a Time.
              </span>
            </h2>

            <p className="mt-7 leading-8 text-gray-400">
              Code-A-Nova is a hackathon initiative designed to bring
              together curious minds, aspiring developers, creative thinkers,
              and technology enthusiasts.
            </p>

            <p className="mt-5 leading-8 text-gray-400">
              We believe innovation starts with a simple question:
              What if there was a better way? Our goal is to create an
              environment where participants can explore technology,
              collaborate with others, solve meaningful challenges, and
              turn their imagination into reality.
            </p>

            <div className="mt-8 flex items-center gap-3 text-violet-300">
              <Target size={22} />
              <span className="font-semibold">
                Think. Build. Innovate. Repeat.
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1024]/90 p-8 backdrop-blur-xl sm:p-10">

              <div className="mb-10 flex items-center justify-between">
                <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 p-3 text-violet-400">
                  <BrainCircuit size={30} />
                </div>
                <span className="text-xs tracking-widest text-gray-500">
                  OUR VISION
                </span>
              </div>

              <h3 className="text-3xl font-bold leading-snug">
                Empowering the next generation of
                <span className="text-cyan-400"> innovators.</span>
              </h3>

              <p className="mt-6 leading-7 text-gray-400">
                We want every participant to leave with more than just a
                project — new skills, meaningful connections, practical
                experience, and the confidence to build what comes next.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Lightbulb className="mb-3 text-yellow-400" size={24} />
                  <p className="font-semibold">Creativity</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Think differently
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Rocket className="mb-3 text-cyan-400" size={24} />
                  <p className="font-semibold">Innovation</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Build the future
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Highlights */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            The Experience
          </span>

          <h2 className="mt-5 text-3xl font-bold sm:text-5xl">
            What Makes Us
            <span className="text-violet-400"> Different?</span>
          </h2>

          <p className="mt-5 text-gray-400">
            An experience designed to challenge your thinking, unlock your
            potential, and bring your ideas to life.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/30 hover:bg-white/[0.06] hover:shadow-2xl ${item.glow}`}
              >
                <div className={`mb-6 inline-flex rounded-xl bg-white/5 p-4 ${item.color}`}>
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="relative border-y border-white/5 bg-white/[0.015] py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Why Participate
            </span>

            <h2 className="mt-5 text-3xl font-bold sm:text-5xl">
              An Opportunity to
              <span className="text-cyan-400"> Level Up.</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-5 rounded-2xl border border-white/10 bg-[#0b1024]/70 p-6 transition-all hover:border-cyan-400/30"
                >
                  <div className="h-fit rounded-xl bg-violet-500/10 p-3 text-violet-400">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Hackathon Journey */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">

        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Your Journey
          </span>

          <h2 className="mt-5 text-3xl font-bold sm:text-5xl">
            From Concept to
            <span className="text-violet-400"> Creation.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-400">
            Every great innovation begins somewhere. Here's the journey
            you'll experience at Code-A-Nova.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {journey.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.number} className="relative">
                {index !== journey.length - 1 && (
                  <div className="absolute left-full top-10 z-10 hidden h-px w-6 bg-gradient-to-r from-violet-500 to-cyan-500 md:block" />
                )}

                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/40">

                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-white/10">
                      {item.number}
                    </span>
                    <Icon className="text-violet-400" size={27} />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-cyan-400">
                    {item.subtitle}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative mx-auto max-w-7xl px-6 pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/80 via-[#10102b] to-cyan-950/50 px-7 py-16 text-center sm:px-14">

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-[90px]" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-[90px]" />

          <div className="relative">
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-violet-300">
              <Flag size={30} />
            </div>

            <h2 className="text-3xl font-bold sm:text-5xl">
              Your Next Big Idea
              <span className="block text-cyan-400">
                Starts Here.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl leading-7 text-gray-400">
              Don't just imagine the future. Be part of building it.
              Join Code-A-Nova and bring your creativity to life.
            </p>

            <Link
              to="/hackathon-registration"
              className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-[#080b1b] transition-all hover:-translate-y-1 hover:bg-cyan-300"
            >
              Register Now
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default About;
