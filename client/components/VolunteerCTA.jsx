"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import wavingHand from "../public/lotties/hand-wave.json";
import confetti from "../public/lotties/Confetti.json";
import stars from "../public/lotties/stars.json";
import VolunteerModal from "./modals/VolunteerModal";

export default function VolunteerCTA() {
  const [showRoles, setShowRoles] = useState(false);
  const [modal, setModal] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        if(data.volunteerRoles) setRoles(data.volunteerRoles);
      })
      .catch(err => {
         // Fallback
         setRoles([
           { title: 'Facilitators', desc: 'Lead training sessions in various tech stacks.' },
           { title: 'Field Support', desc: 'Ensure logistics and ground operations run smoothly.' },
           { title: 'Media & Outreach', desc: 'Manage social media and community engagement.' }
         ]);
      });
  }, []);

  return (
    <section id="volunteer" className="relative py-24 overflow-hidden bg-white">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50/50 to-transparent -z-10" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Impact Driven
          </div>

          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1]">
              Shape the Future, <br />
              <span className="text-orange-600">Be a Volunteer!</span>
            </h3>
            <div className="w-16 h-16 hidden md:block">
              <Lottie animationData={wavingHand} loop autoplay />
            </div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Join a community of changemakers. At Tech4All, we don’t just train people — we build legacies. Your expertise can be the bridge to someone's dream career.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {[
              { icon: <Lottie animationData={stars} className="w-6 h-6" />, text: "Global Recognition" },
              { icon: "🌍", text: "Career Networking" },
              { icon: "🎓", text: "Skill Certification" },
              { icon: "⭐", text: "Mentorship Growth" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3 text-gray-700 font-bold"
              >
                <span className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shadow-sm border border-gray-100">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/volunteer"
              className="px-8 py-4 bg-gray-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl hover:bg-orange-600 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Start Your Journey
            </Link>
            <button
              onClick={() => setShowRoles(true)}
              className="px-8 py-4 border-2 border-gray-200 text-gray-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:border-orange-500 hover:text-orange-600 transition-all transform hover:-translate-y-1"
            >
              Explore Roles
            </button>
          </div>
        </motion.div>

        {/* Illustration Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 relative"
        >
          <div className="absolute inset-0 bg-orange-500/10 blur-[120px] rounded-full" />
          <img
            src="/volunteer/volunteer-illustration.jpg"
            alt="Volunteer illustration"
            className="w-full relative z-10 transform hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Roles Modal Overlay */}
      {showRoles && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] shadow-2xl p-10 max-w-3xl w-full border border-white/20 relative"
          >
            <button onClick={() => setShowRoles(false)} className="absolute top-8 right-8 text-gray-400 hover:text-orange-500 transition">
              <span className="text-2xl font-black">✕</span>
            </button>
            
            <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">
              🌟 Available <span className="text-orange-600">Roles</span>
            </h2>
            
            <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              {roles.map((role, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                    {role.title}
                  </h3>
                  <p className="mt-3 text-gray-600 font-medium leading-relaxed border-l-2 border-gray-100 pl-4 ml-0.5">
                    {role.desc}
                  </p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => { setShowRoles(false); setModal("volunteer"); }}
              className="mt-10 w-full py-5 bg-orange-600 text-white font-black uppercase tracking-[3px] text-[10px] rounded-2xl hover:bg-orange-700 transition shadow-xl shadow-orange-500/20"
            >
              Choose a Role & Apply
            </button>
          </motion.div>
        </div>
      )}

      {/* Premium Volunteer Modal */}
      {modal === "volunteer" && (
        <VolunteerModal 
          onClose={() => setModal(null)} 
          onSubmit={(name) => {
             setModal(null);
             // Confetti triggered in VolunteerModal.jsx
          }} 
        />
      )}
    </section>
  );
}
