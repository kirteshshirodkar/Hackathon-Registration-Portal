
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Users,
  Lightbulb,
  Trophy,
  Rocket,
  Zap,
  Layers,
  Target,
  ChevronDown,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Build Something Real",
    description:
      "Turn creative ideas into working solutions using technology, code, and innovation.",
  },
  {
    icon: Users,
    title: "Collaborate & Connect",
    description:
      "Work with creative minds, exchange ideas, and learn from fellow participants.",
  },
  {
    icon: Lightbulb,
    title: "Think Beyond Limits",
    description:
      "Explore new possibilities, solve meaningful problems, and challenge yourself.",
  },
  {
    icon: Trophy,
    title: "Showcase Your Skills",
    description:
      "Present your work, demonstrate your abilities, and gain valuable experience.",
  },
];

const journey = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Imagine",
    description: "Start with an idea and identify a problem worth solving.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Create",
    description: "Plan your solution, collaborate, and start building.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Innovate",
    description: "Transform your concept into a working solution.",
  },
  {
    number: "04",
    icon: Trophy,
    title: "Showcase",
    description: "Present your creation and share your innovation.",
  },
];

const Home = () => {
  return (
    <div className="overflow-hidden bg-[#050816] text-white">

      {/* HERO SECTION */}
      <section className="relative flex min-h-[650px] items-center justify-center px-6 py-24 md:min-h-[750px]">

        {/* Background Effects */}
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:55px_55px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            <Sparkles size={16} />
            <span>Where Ideas Meet Innovation</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            THINK.
            <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              BUILD.
            </span>
            <span className="block">INNOVATE.</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Welcome to Code-a-Nova, a platform where creativity meets
            technology. Bring your ideas to life, collaborate with
            innovative minds, and build solutions that make a difference.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/signup"
              className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-violet-600/40"
            >
              Get Started
              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/about"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white transition hover:border-violet-400/50 hover:bg-white/10"
            >
              Explore More
            </Link>

          </div>

          {/* Bottom Indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-[0.3em]">
              Discover More
            </span>
            <ChevronDown size={20} className="animate-bounce" />
          </div>

        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="relative border-y border-white/5 bg-white/[0.02] px-6 py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              About Code-a-Nova
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              More Than Just
              <span className="block text-violet-400">
                Writing Code.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              Innovation begins with curiosity. Code-a-Nova brings
              together technology enthusiasts and creative thinkers
              to explore ideas, develop practical solutions, and
              experience the power of collaboration.
            </p>

            <p className="mt-4 leading-8 text-gray-400">
              Whether you're a beginner or an experienced developer,
              this is an opportunity to learn, experiment, and push
              your creative boundaries.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Discover Our Vision
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Visual Card */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-[#0c1022] p-8 sm:p-12">

              <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
                  <Code2 size={26} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Innovation Starts Here
                  </h3>
                  <p className="text-sm text-gray-500">
                    Imagine. Develop. Transform.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-5 font-mono text-sm">

                <p className="text-gray-500">
                  <span className="text-violet-400">01.</span> Think
                  creatively
                </p>

                <p className="text-gray-500">
                  <span className="text-blue-400">02.</span> Build
                  intelligently
                </p>

                <p className="text-gray-500">
                  <span className="text-purple-400">03.</span> Solve
                  real problems
                </p>

                <div className="mt-8 rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
                  <div className="flex items-center gap-2 text-violet-300">
                    <Zap size={18} />
                    <span className="font-semibold">Your Ideas Matter</span>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-gray-400">
                    Every great innovation starts with a single idea.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HIGHLIGHTS SECTION */}
      <section className="px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Why Code-a-Nova
            </span>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
              An Experience That
              <span className="text-violet-400"> Inspires</span>
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Discover opportunities to learn, collaborate, innovate,
              and turn your imagination into something meaningful.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:bg-violet-500/[0.05]"
                >
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 text-violet-400 transition group-hover:from-violet-600 group-hover:to-blue-600 group-hover:text-white">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    {item.description}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              The Journey
            </span>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
              From Idea to
              <span className="text-violet-400"> Innovation</span>
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {journey.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.number} className="relative">

                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-4xl font-bold text-white/10">
                      {item.number}
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400">
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative overflow-hidden px-6 py-28">

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-600/30">
            <Target size={30} />
          </div>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            Ready to Turn Your
            <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Ideas Into Reality?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-8 text-gray-400">
            Take the first step towards innovation. Join the
            Code-a-Nova community and start creating something amazing.
          </p>

          <Link
            to="/signup"
            className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-9 py-4 font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-1 hover:shadow-violet-600/40"
          >
            Join Code-a-Nova
            <ArrowRight
              size={19}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </div>
      </section>

    </div>
  );
};

export default Home;
