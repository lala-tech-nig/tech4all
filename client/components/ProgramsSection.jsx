'use client'; 
import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import RequestModal from './RequestModal';

const PROGRAMS = [
  { 
    id: 'repair', 
    title: 'Phone & Laptop Repair', 
    desc: 'Learn hands-on diagnostics and repair skills, covering hardware replacement, software fixes, and troubleshooting techniques. This course prepares you to start a career or run your own repair shop.', 
    video: '/programs/repair.mp4' 
  },
  { 
    id: 'web', 
    title: 'Website Development', 
    desc: 'Master HTML, CSS, JavaScript, and responsive design to build and launch professional websites. Ideal for beginners and aspiring developers looking to start freelancing or working in tech.', 
    video: '/programs/web.mp4' 
  },
  { 
    id: 'intro', 
    title: 'Intro to Computer', 
    desc: 'Understand operating systems, file management, email usage, and office productivity tools. Perfect for beginners, students, and anyone new to computers.', 
    video: '/programs/intro.mp4' 
  },
  { 
    id: 'dm', 
    title: 'Digital Marketing', 
    desc: 'Learn social media strategy, paid ads, branding, SEO, and digital tools to help small businesses grow online. Designed for entrepreneurs and business owners.', 
    video: '/programs/dm.mp4' 
  },
  { 
    id: 'content', 
    title: 'Content Creation', 
    desc: 'Develop creative skills in photography, videography, audio editing, and graphics to tell compelling digital stories across platforms like YouTube, Instagram, and TikTok.', 
    video: '/programs/content.mp4' 
  },
  { 
    id: 'market', 
    title: 'Market Women Tech Skills', 
    desc: 'Empowering market women with essential digital tools for payments, inventory, and online selling, helping them expand their businesses and access more customers.', 
    video: '/programs/market.mp4' 
  },
];

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [requestProgram, setRequestProgram] = useState(null);

  return (
    <section id="programs" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Our Programs</h3>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Practical, high-impact trainings tailored to communities, youths, and organizations.
        </p>
      </div>

      {/* Program Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div className="relative h-48 w-full">
              <video 
                src={p.video} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h4 className="absolute bottom-3 left-4 text-xl font-bold text-white">{p.title}</h4>
            </div>
            <div className="p-6 flex flex-col justify-between h-44">
              <p className="text-gray-600 text-sm line-clamp-3">{p.desc}</p>
              <div className="mt-4 flex justify-between items-center">
                <button 
                  onClick={() => setSelectedProgram(p)} 
                  className="text-orange-500 font-medium hover:underline"
                >
                  Learn more →
                </button>
                <button 
                  onClick={() => setRequestProgram(p)} 
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Request
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Learn More Modal */}
      {selectedProgram && (
        <Modal onClose={() => setSelectedProgram(null)}>
          <div className="p-6 text-center">
            <video 
              src={selectedProgram.video} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="rounded-xl mb-4 max-h-60 mx-auto object-cover" 
            />
            <h4 className="text-2xl font-bold mb-3">{selectedProgram.title}</h4>
            <p className="text-gray-700 mb-6">{selectedProgram.desc}</p>
            <button 
              onClick={() => {
                setRequestProgram(selectedProgram);
                setSelectedProgram(null);
              }}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Request this Program
            </button>
          </div>
        </Modal>
      )}

      {/* Request Form Modal */}
      {requestProgram && (
        <RequestModal 
          programName={requestProgram.title} 
          onClose={() => setRequestProgram(null)} 
        />
      )}
    </section>
  );
}
