'use client';
import { motion } from 'framer-motion';

export default function VolunteerCTA() {
  return (
    <section id="volunteer" className="relative bg-gradient-to-r from-orange-50 via-white to-orange-100 py-20 overflow-hidden">
      {/* Background Decorative Orbs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -80 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h3 className="text-4xl font-extrabold text-gray-900 leading-snug">
            🚀 Step Up, Shine Bright — <span className="text-orange-600">Volunteer with Tech4All!</span>
          </h3>
          <p className="mt-4 text-lg text-gray-700">
            Share your skills to empower youths, transform communities, and leave a legacy.  
            When you volunteer, you don’t just give back — you also <span className="font-semibold text-orange-600">grow, connect, and get recognized.</span>
          </p>

          {/* Benefits */}
          <ul className="mt-6 space-y-3 text-gray-700">
            <motion.li 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              ✅ Public recognition as a valued Tech4All contributor
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
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-700 transition"
            >
              Become a Volunteer
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition"
            >
              Explore Roles
            </motion.a>
          </div>
        </motion.div>

        {/* Illustration Side (Animated) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img 
            src="/volunteer/volunteer-illustration.jpg" 
            alt="Volunteer illustration" 
            className="w-80 md:w-[450px] animate-bounce-slow rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
