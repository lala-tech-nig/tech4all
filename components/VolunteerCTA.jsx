"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import wavingHand from "../public/lotties/hand-wave.json";
import confetti from "../public/lotties/Confetti.json";
import stars from "../public/lotties/stars.json";
import ReusableModal from "./ReusableModal";
import toast from "react-hot-toast";
import Confetti from "react-confetti";

export default function VolunteerCTA() {
  const [showRoles, setShowRoles] = useState(false);
  const [modal, setModal] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);

  const roles = [
    {
      title: '🎤 Facilitators',
      desc: `Facilitators are the heart of our training programs. They lead engaging sessions, 
      simplify complex tech topics, and inspire learners to discover their full potential. 
      As a facilitator, you’ll empower youths by sharing knowledge, mentoring them, 
      and sparking curiosity that lasts a lifetime.`
    },
    {
      title: '🛠 Field Support',
      desc: `Field Support volunteers ensure our training grounds and learning environments 
      run smoothly. From setting up equipment to assisting participants, you’ll make sure 
      everyone has the tools and resources to succeed in their training journey.`
    },
    {
      title: '📢 Promoters',
      desc: `Promoters are our community champions. You’ll spread the word about Tech4All’s 
      programs and events, both online and offline. With your energy, creativity, and 
      voice, you’ll help us reach more people and amplify our mission.`
    },
    {
      title: '🤝 Coordinators',
      desc: `Coordinators oversee program flow, ensuring excellence in execution. You’ll manage 
      schedules, support facilitators, and create a seamless experience for learners. 
      Coordinators are the backbone that keeps every program organized and impactful.`
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    toast.success(`Volunteer application by ${name} received. 🎉`, {
      duration: 10000,
    });

    setModal(null);
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 10000);
  };

  return (
    <section id="volunteer" className="relative py-20 overflow-hidden">
      {confettiActive && <Confetti />}
      {/* Background Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Lottie animationData={confetti} loop autoplay />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-xl relative z-10"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-4xl font-extrabold text-gray-900 leading-snug">
              🚀 Step Up, Shine Bright —{" "}
              <span className="text-orange-600">Volunteer with Tech4All!</span>
            </h3>
            <div className="w-12 h-12">
              <Lottie animationData={wavingHand} loop autoplay />
            </div>
          </div>

          <p className="mt-4 text-lg text-gray-700">
            Share your skills to empower youths, transform communities, and
            leave a legacy. When you volunteer, you don’t just give back — you
            also{" "}
            <span className="font-semibold text-orange-600">
              grow, connect, and get recognized.
            </span>
          </p>

          {/* Benefits */}
          <ul className="mt-6 space-y-3 text-gray-700">
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="w-6 h-6">
                <Lottie animationData={stars} loop autoplay />
              </span>
              Public recognition as a valued Tech4All contributor
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              🌍 Job recommendations & network opportunities
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              ⭐ Star ranking to showcase on your resume
            </motion.li>
          </ul>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button
              onClick={() => setModal("volunteer")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-700 transition"
            >
              Become a Volunteer
            </motion.button>
            <motion.button
              onClick={() => setShowRoles(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition"
            >
              Explore Roles
            </motion.button>
          </div>
        </motion.div>

        {/* Illustration Side */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex justify-center relative z-10"
        >
          <img
            src="/volunteer/volunteer-illustration.jpg"
            alt="Volunteer illustration"
            className="w-80 md:w-[450px] animate-bounce-slow"
          />
        </motion.div>
      </div>

      {/* Roles Modal */}
      {showRoles && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-6">
              🌟 Volunteer Roles at Tech4All
            </h2>
            <div className="space-y-6">
              {roles.map((role, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-gray-700 leading-relaxed">
                    {role.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowRoles(false)}
                className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Volunteer Form Modal (same as HeroCarousel) */}
      <ReusableModal
        isOpen={modal === "volunteer"}
        onClose={() => setModal(null)}
        title="Volunteer With Us"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full border p-3 rounded-lg"
          />
          <textarea
            name="skills"
            placeholder="What skills can you teach or support with?"
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-lg text-white font-semibold"
          >
            Submit
          </button>
        </form>
      </ReusableModal>
    </section>
  );
}
