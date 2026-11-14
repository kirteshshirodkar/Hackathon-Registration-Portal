
import { Link } from "react-router-dom";
import { Sparkles, FolderGit2, Globe, ArrowUpRight } from "lucide-react";

const DashboardFooter = () => {
  return (
    <footer className="relative border-t border-white/10 bg-[#050816]">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

          {/* Branding */}
          <div className="text-center md:text-left">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
                <Sparkles size={19} className="text-white" />
              </div>

              <span className="text-lg font-bold text-white">
                Code-a-<span className="text-violet-400">Nova</span>
              </span>
            </Link>

            <p className="mt-3 text-sm text-gray-500">
              Think. Build. Innovate. Repeat.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">

            <Link
              to="/"
              className="transition hover:text-violet-400"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="transition hover:text-violet-400"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="transition hover:text-violet-400"
            >
              Contact
            </Link>

            <Link
              to="/register"
              className="transition hover:text-violet-400"
            >
              Registration
            </Link>

          </div>

          {/* External Link */}
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-cyan-400"
          >
            <Globe size={17} />
            Main Website
            <ArrowUpRight size={15} />
          </Link>

        </div>

        <div className="my-8 h-px bg-white/5" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Code-A-Nova. All rights reserved.
          </p>

          <p>
            Built with passion and innovation.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default DashboardFooter;
