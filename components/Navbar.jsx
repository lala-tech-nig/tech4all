"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { id: "programs", label: "Programs" },
  { id: "hall", label: "Hall of Fame" },
  { id: "gallery", label: "Gallery" },
  { id: "partners", label: "Partners" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      let current = "";
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section && scrollY >= section.offsetTop) {
          current = link.id;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Tech4All logo"
            width={120}
            height={48}
            priority
            className="hover-scale-soft"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-700 relative">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative transition-colors hover:text-orange-500 ${
                active === link.id ? "text-orange-500 font-semibold" : ""
              }`}
            >
              {link.label}
              {/* Active underline indicator */}
              {active === link.id && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-orange-500 rounded-full"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-2 bg-orange-500 text-white rounded-full shadow-md transition transform hover:scale-105 hover:bg-orange-600"
          >
            Request Training
          </a>
          <a
            href="#contact"
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-full transition transform hover:scale-105 hover:bg-orange-50"
          >
            Volunteer
          </a>
          <a
            href="#donate"
            className="px-5 py-2 bg-black text-white rounded-full shadow-md transition transform hover:scale-105 hover:bg-gray-900"
          >
            Donate
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-800 rounded" />
          <span className="w-6 h-0.5 bg-gray-800 rounded" />
          <span className="w-6 h-0.5 bg-gray-800 rounded" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t"
        >
          <div className="flex flex-col items-center gap-4 py-6 font-medium text-gray-700">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`transition hover:text-orange-500 ${
                  active === link.id ? "text-orange-500 font-semibold" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-4 py-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Request Training
            </a>
            <a
              href="#contact"
              className="px-4 py-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 transition"
              onClick={() => setMenuOpen(false)}
            >
              Volunteer
            </a>
            <a
              href="#donate"
              className="px-5 py-2 bg-black text-white rounded-full shadow-md hover:bg-gray-900 transition"
              onClick={() => setMenuOpen(false)}
            >
              Donate
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
