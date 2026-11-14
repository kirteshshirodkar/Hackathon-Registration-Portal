
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  ClipboardList,
  Globe,
  ChevronRight,
} from "lucide-react";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Hackathon Registration",
      path: "/register",
      icon: ClipboardList,
    },
  ];

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-violet-500/10 text-violet-400"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050816]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20">
            <Sparkles size={22} className="text-white" />
          </div>

          <div>
            <span className="text-xl font-bold tracking-wide text-white">
              Code-a-<span className="text-violet-400">Nova</span>
            </span>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
              Participant Portal
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end
                className={linkStyle}
              >
                <Icon size={17} />
                {link.name}
              </NavLink>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-5 md:flex">

          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-cyan-400"
          >
            <Globe size={17} />
            Visit Website
            <ChevronRight size={15} />
          </Link>

          <div className="h-8 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            <span className="text-xs text-gray-400">
              Logged In
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#080c1c] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-2">

            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end
                  onClick={() => setIsOpen(false)}
                  className={linkStyle}
                >
                  <Icon size={18} />
                  {link.name}
                </NavLink>
              );
            })}

            <div className="my-2 border-t border-white/10" />

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
            >
              <Globe size={18} />
              Visit Website
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
