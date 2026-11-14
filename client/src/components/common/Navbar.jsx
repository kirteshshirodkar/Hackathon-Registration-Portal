
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const linkStyle = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-violet-400"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
            <Sparkles className="text-white" size={22} />
          </div>

          <span className="text-xl font-bold tracking-wide text-white">
            Code-a-<span className="text-violet-400">Nova</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkStyle}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="text-gray-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 font-medium text-white transition hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#050816] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={linkStyle}
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-gray-300"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-center font-medium text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
