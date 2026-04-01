'use client'; 
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';
import { motion } from 'framer-motion';
import Modal from './Modal';
import RequestModal from './RequestModal';


export default function ProgramsSection() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [requestProgram, setRequestProgram] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/courses`)
      .then(res => res.json())
      .then(data => setPrograms(data))
      .catch(err => console.error('Error fetching programs:', err));
  }, []);

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
        {programs.map((p, i) => (
          <motion.article
            key={p._id || p.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div className="relative h-48 w-full group">
              <video 
                src={p.videoUrl || p.video} 
                poster={p.imageUrl}
                autoPlay 
                loop 
                muted 
                playsInline 
                className="object-cover h-full w-full opacity-80 group-hover:opacity-100 transition duration-500"
              />
              {!p.videoUrl && !p.video && p.imageUrl && (
                <img src={p.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt={p.title} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <h4 className="absolute bottom-3 left-4 text-xl font-bold text-white">{p.title}</h4>
            </div>
            <div className="p-6 flex flex-col justify-between h-44">
              <p className="text-gray-600 text-sm line-clamp-3">{p.description || p.desc}</p>
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
              src={selectedProgram.videoUrl || selectedProgram.video} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="rounded-xl mb-4 max-h-60 mx-auto object-cover" 
            />
            <h4 className="text-2xl font-bold mb-3">{selectedProgram.title}</h4>
            <p className="text-gray-700 mb-6">{selectedProgram.description || selectedProgram.desc}</p>
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
