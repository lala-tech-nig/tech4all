'use client';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

// Import animations
import wavingHand from '../public/lotties/hand-wave.json';
import confetti from '../public/lotties/Confetti.json';
import stars from '../public/lotties/stars.json';

export default function VolunteerCTA({ onOpenVolunteer }) {
  return (
    <section id="volunteer" className="relative py-20 overflow-hidden">
      {/* Background Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Lottie animationData={confetti} loop={true} autoplay={true} />
      </div>

      <div className="relative max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-xl relative z-10"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-4xl font-extrabold text-gray-900 leading-snug">
              🚀 Step Up, Shine Bright — <span className="text-orange-600">Volunteer with Tech4All!</span>
            </h3>
            {/* Waving hand animation */}
            <div className="w-12 h-12">
              <Lottie animationData={wavingHand} loop={true} autoplay={true} />
            </div>
          </div>

          <p className="mt-4 text-lg text-gray-700">
            Share your skills to empower youths, transform communities, and leave a legacy.  
            When you volunteer, you don’t just give back — you also{' '}
            <span className="font-semibold text-orange-600">grow, connect, and get recognized.</span>
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
                <Lottie animationData={stars} loop={true} autoplay={true} />
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
              onClick={onOpenVolunteer} // Opens the Volunteer Modal
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-700 transition"
            >
              Become a Volunteer
            </motion.button>
            <motion.a
              href="#roles"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition"
            >
              Explore Roles
            </motion.a>
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
    </section>
  );
}
