
import { Link } from "react-router-dom";
import { FolderGit2, Link2, Mail, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Branding */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="text-violet-400" size={24} />
              <span className="text-xl font-bold text-white">
                Code-a-<span className="text-violet-400">Nova</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
              Innovate, collaborate, and create.
              Bring your ideas to life through technology
              and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link to="/" className="hover:text-violet-400">Home</Link>
              <Link to="/about" className="hover:text-violet-400">About</Link>
              <Link to="/contact" className="hover:text-violet-400">Contact</Link>
              <Link to="/signup" className="hover:text-violet-400">Get Started</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Connect With Us
            </h3>

            <div className="flex gap-4 text-gray-400">
              <a href="mailto:contact@codeanova.com" aria-label="Email">
                <Mail className="hover:text-violet-400" />
              </a>

              <a href="#" aria-label="GitHub">
                <FolderGit2 className="hover:text-violet-400" />
              </a>

              <a href="#" aria-label="LinkedIn">
                <Link2 className="hover:text-violet-400" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Code-a-Nova. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
