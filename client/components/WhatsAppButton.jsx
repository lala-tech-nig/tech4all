'use client';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = "2348121444306"; // From SiteSettings default
  const message = "Hello Tech4All, I'd like to make an inquiry.";
  const url = `https://wa.me/${phoneNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center pointer-events-none">
      {/* Tooltip/Message label */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          ease: "easeInOut" 
        }}
        className="bg-orange-600 text-white text-[11px] font-black px-4 py-2 rounded-xl mb-4 shadow-[0_10px_25px_-5px_rgba(234,88,12,0.4)] relative border border-orange-500/50 backdrop-blur-sm pointer-events-auto"
      >
        WE ARE HERE
        {/* Triangle arrow */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-orange-600" />
      </motion.div>

      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:shadow-[0_25px_60px_rgba(37,211,102,0.6)] transition-all pointer-events-auto group relative"
      >
        <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500" />
        <MessageCircle size={36} fill="currentColor" strokeWidth={1} className="relative z-10" />
        
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-2xl ring-4 ring-[#25D366] animate-ping opacity-20" />
      </motion.a>
    </div>
  );
}
