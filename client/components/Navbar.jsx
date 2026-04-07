"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Heart, Users, MessageSquare, Box } from "lucide-react";
import TrainingModal from "./modals/TrainingModal";
import VolunteerModal from "./modals/VolunteerModal";
import DonateModal from "./modals/DonateModal";
import toast from "react-hot-toast";


const navLinks = [
  { id: "home", label: "Home", icon: <Box size={16} /> },
  { id: "programs", label: "Programs", icon: <Box size={16} /> },
  { id: "hall", label: "Hall of Fame", icon: <Users size={16} /> },
  { id: "gallery", label: "Gallery", icon: <ChevronRight size={16} /> },
  { id: "partners", label: "Partners", icon: <ChevronRight size={16} /> },
  { id: "contact", label: "Contact", icon: <MessageSquare size={16} /> },
];


export default function Navbar() {
  const [active, setActive] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);



  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Scroll-spy logic
      const scrollY = window.scrollY + 100;
      let currentSection = "";
      navLinks.forEach((link) => {
        const element = document.getElementById(link.id);
        if (element && scrollY >= element.offsetTop && scrollY < element.offsetTop + element.offsetHeight) {
           currentSection = link.id;
        }
      });
      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (type, name) => {
    // Modal already showed a specific toast, but we can add a generic one or just trigger confetti
    window.dispatchEvent(new CustomEvent('show-confetti'));
    setModal(null);
  };


  const handleDonateSuccess = () => {
    window.dispatchEvent(new CustomEvent('show-confetti'));
    setModal(null);
  };


  return (
    <>

      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-3 px-4 md:px-8" 
            : "py-6 px-6 md:px-10"
        }`}
      >
        <nav 
          className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl transition-all duration-500 ${
            isScrolled 
              ? "bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl px-6 py-3" 
              : "bg-transparent px-2 py-0"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative flex items-center group">
            <div className="absolute -inset-2 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
            <Image 
              src="/tech4alllogonewnew.png" 
              alt="Tech4All Logo" 
              width={110} 
              height={44} 
              className="relative object-contain transition transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative px-4 py-2 text-sm font-bold tracking-tight transition-all duration-300 rounded-lg group ${
                  active === link.id ? "text-orange-600" : "text-gray-600 hover:text-gray-950 hover:bg-gray-50"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {active === link.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-orange-50 rounded-lg border border-orange-100"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-orange-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
             <button
                onClick={() => setModal("volunteer")}
                className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-orange-600 transition flex items-center gap-2"
              >
                Volunteer
              </button>
              <button
                onClick={() => setModal("training")}
                className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/20 transform hover:-translate-y-0.5 transition active:scale-95"
              >
                Request Training
              </button>
              <button
                onClick={() => setModal("donate")}
                className="group relative px-6 py-2.5 bg-orange-600 text-white text-sm font-bold rounded-xl shadow-[0_10px_20px_-5px_rgba(234,88,12,0.3)] hover:shadow-[0_15px_25px_-5px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
              >
                <Heart size={16} className="group-hover:scale-125 transition-transform" fill="currentColor" />
                <span>Donate</span>
                <div className="absolute inset-0 rounded-xl ring-2 ring-orange-500 ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-6 right-6 mt-4 bg-white/95 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl overflow-hidden z-[49]"
            >
              <div className="p-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-orange-50 transition group"
                  >
                    <span className="font-bold text-gray-800 group-hover:text-orange-600 transition">{link.label}</span>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-orange-500 transition px-0" />
                  </a>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setModal("volunteer"); setMobileMenuOpen(false); }}
                    className="py-4 bg-gray-100 text-gray-800 font-bold rounded-2xl hover:bg-gray-200 transition"
                  >
                    Volunteer
                  </button>
                  <button
                    onClick={() => { setModal("training"); setMobileMenuOpen(false); }}
                    className="py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition"
                  >
                    Training
                  </button>
                  <button
                    onClick={() => { setModal("donate"); setMobileMenuOpen(false); }}
                    className="col-span-2 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2"
                  >
                    <Heart size={18} fill="currentColor" />
                    Give a Donation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modals Bridge */}
      {modal === "training" && (
        <TrainingModal onClose={() => setModal(null)} onSubmit={(name) => handleSubmit("training", name)} />
      )}
      {modal === "volunteer" && (
        <VolunteerModal onClose={() => setModal(null)} onSubmit={(name) => handleSubmit("volunteer", name)} />
      )}
      {modal === "donate" && (
        <DonateModal onClose={() => setModal(null)} onComplete={handleDonateSuccess} />
      )}

    </>
  );
}
