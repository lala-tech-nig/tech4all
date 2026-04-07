'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="pb-32">
      <div className="relative pt-40 pb-24 overflow-hidden bg-gray-50 border-b border-gray-100">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/5 -z-10 blur-3xl opacity-50" />
         <div className="max-w-7xl mx-auto px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-black text-gray-900 leading-tight tracking-tight uppercase"
            >
              Who We <span className="text-orange-600 italic lowercase">Are</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-gray-400 font-medium max-w-3xl mt-8 leading-relaxed italic"
            >
              "Eradicating computer illiteracy and empowering the next generation of tech leaders."
            </motion.p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-20 items-center">
         <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
         >
            <h2 className="text-4xl font-black text-gray-900 mb-8 border-l-8 border-orange-500 pl-6 uppercase tracking-tight">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-10">
              Tech4All by LALA TECH is more than just a training program. It is a movement aimed at democratizing technology across Nigeria and beyond. We believe that everyone, regardless of their background, should have the opportunity to master digital skills and thrive in the modern economy.
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div className="p-8 bg-gray-900 rounded-3xl text-white transform hover:rotate-2 transition">
                  <h3 className="text-3xl font-black text-orange-500 mb-2">10k+</h3>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-80">Students Trained</p>
               </div>
               <div className="p-8 bg-white border-2 border-gray-100 rounded-3xl transform hover:-rotate-2 transition">
                  <h3 className="text-3xl font-black text-orange-500 mb-2">5+</h3>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400">States Reached</p>
               </div>
            </div>
         </motion.div>

         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
         >
            <div className="absolute -inset-4 border-2 border-orange-200 rounded-[3rem] -z-10 rotate-3" />
            <img 
               src="/volunteer/volunteer-illustration.jpg" 
               alt="Team at Tech4All"
               className="rounded-[3rem] w-full shadow-2xl skew-x-1"
            />
         </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32 text-center">
         <div className="p-20 bg-gray-900 rounded-[4rem] text-white overflow-hidden relative group">
            <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-10 transition duration-1000" />
            <h2 className="text-4xl font-black mb-6 uppercase tracking-widest">Wanna join the movement?</h2>
            <p className="max-w-xl mx-auto opacity-70 mb-10 font-bold tracking-widest uppercase text-xs">Be part of the solution and help us transform lives.</p>
            <div className="flex flex-wrap justify-center gap-4">
               <Link href="/volunteer" className="px-10 py-5 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition transform hover:scale-105 inline-block">
                  Volunteer Now
               </Link>
               <Link href="/contact" className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition transform hover:scale-105 inline-block">
                  Donate Now
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
