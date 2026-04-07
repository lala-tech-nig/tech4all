"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import TrainingModal from "./modals/TrainingModal";
import VolunteerModal from "./modals/VolunteerModal";
import DonateModal from "./modals/DonateModal";
import { Heart, Sparkles, Rocket, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/hero-slides`)
      .then(res => res.json())
      .then(data => setSlides(data))
      .catch(() => {
        setSlides([
          { src: "/hero1.jpg", title: "Tech4All by LALA TECH", subtitle: "Join the global mission to eradicate computer illiteracy." },
          { src: "/hero2.jpg", title: "Empower Your Community", subtitle: "Request free programs tailored to your people." },
          { src: "/hero3.jpg", title: "Learn Skills That Pay", subtitle: "From phone & laptop repairs to digital marketing." },
        ]);
      });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 10000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        {slides.map((s, i) => i === index && (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20" />
            <Image 
              src={s.src} 
              alt={s.title} 
              fill 
              priority
              className="object-cover transform scale-105 animate-slow-zoom" 
            />
            
            <div className="relative z-30 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-4xl"
              >
                <div className="flex items-center gap-3 mb-6">
                   <div className="h-[2px] w-12 bg-orange-500" />
                   <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">Innovation & Impact</span>
                </div>

                <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8 drop-shadow-2xl">
                  {s.title.split(' ').map((word, idx) => (
                    <span key={idx} className={word.toLowerCase() === 'tech4all' ? 'text-orange-600 block md:inline' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h2>

                <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-2xl font-medium leading-relaxed drop-shadow-lg mb-12">
                   {s.subtitle}
                </p>

                <div className="flex flex-wrap gap-6">
                  <button
                    onClick={() => setModal("training")}
                    className="group relative px-10 py-5 bg-orange-600 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-2xl overflow-hidden active:scale-95 transition-all"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                       Request Training <Rocket size={16} />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>

                  <button
                    onClick={() => setModal("volunteer")}
                    className="px-10 py-5 bg-white text-gray-900 font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl hover:bg-gray-100 active:scale-95 transition-all flex items-center gap-2"
                  >
                    Volunteer <Sparkles size={16} className="text-orange-500" />
                  </button>

                  <button
                    onClick={() => setModal("donate")}
                    className="px-10 py-5 bg-transparent border-2 border-white/20 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-white hover:text-gray-900 transition-all flex items-center gap-2 overflow-hidden group"
                  >
                    <Heart size={16} className="group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                    <span>Support Us</span>
                  </button>
                </div>

                <div className="mt-20 flex items-center gap-10">
                   <div className="flex -space-x-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-gray-900 overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                        </div>
                      ))}
                      <div className="w-12 h-12 rounded-full border-4 border-gray-900 bg-orange-600 flex items-center justify-center text-[10px] font-black text-white">
                         10K+
                      </div>
                   </div>
                   <div className="text-white/60 text-xs font-black uppercase tracking-[3px]">
                      Joined by thousands of students
                   </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute bottom-12 right-12 z-40 flex flex-col gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="flex items-center gap-4 group text-right focus:outline-none"
          >
            <span className={`text-[10px] font-black uppercase tracking-widest transition duration-500 ${i === index ? 'text-orange-500 scale-110 opacity-100' : 'text-white/30 opacity-0 group-hover:opacity-100'}`}>0{i + 1}</span>
            <div className={`h-[2px] transition-all duration-500 ${i === index ? 'w-12 bg-orange-500' : 'w-4 bg-white/20 group-hover:w-8 group-hover:bg-white/40'}`} />
          </button>
        ))}
      </div>

      {/* Global Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full animate-pulse" />
      </div>

      {/* Modals */}
      {modal === "training" && (
        <TrainingModal 
          onClose={() => setModal(null)} 
          onSubmit={(name) => {
            setModal(null);
            // Confetti and success handled in TrainingModal
          }} 
        />
      )}
      {modal === "volunteer" && (
        <VolunteerModal 
          onClose={() => setModal(null)} 
          onSubmit={(name) => {
            setModal(null);
          }} 
        />
      )}
      {modal === "donate" && (
        <DonateModal onClose={() => setModal(null)} onComplete={() => setModal(null)} />
      )}
    </section>
  );
}
