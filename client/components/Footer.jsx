'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/utils/api';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import toast from 'react-hot-toast';

export default function Footer() {
  const [settings, setSettings] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  const contact = settings?.contact || {
    address: '12 LALA TECH Hub, Olambe-Akute, Ogun State, Nigeria',
    phone: '+234 812 144 4306',
    email: 'lalatechnigltd@gmail.com'
  };

  const socials = settings?.socials || {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#'
  };

  const about = settings?.about || {
    footer_text: 'Tech4All by LALA TECH — empowering youths and communities worldwide with free technology training.'
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    // Simulate API call for newsletter
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Subscribed successfully!");
      window.dispatchEvent(new CustomEvent('show-confetti'));
      setEmail('');
    } catch {
      toast.error("Subscription failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-gray-950 text-gray-300 overflow-hidden mt-20">
      {/* Background Accent Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-purple-500/10 to-transparent blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12 border-t border-white/5">
        
        {/* Logo & About */}
        <div className="space-y-6">
          <div className="bg-white p-3 rounded-2xl shadow-xl w-fit transform hover:rotate-3 transition-transform duration-500">
            <img 
              src="/tech4alllogonewnew.png" 
              alt="Tech4All Logo" 
              className="w-32 object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-400 font-medium italic">
            <span className="font-black text-white not-italic uppercase tracking-wider text-xs">Tech4All</span> by LALA TECH — 
            {about.footer_text}
          </p>

          <div className="flex space-x-3 mt-6">
            {[
              {icon: <FaFacebookF size={16} />, href: socials.facebook},
              {icon: <FaTwitter size={16} />, href: socials.twitter},
              {icon: <FaInstagram size={16} />, href: socials.instagram},
              {icon: <FaYoutube size={16} />, href: socials.youtube},
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href} 
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-white/5 hover:bg-orange-500 text-gray-400 hover:text-white transform hover:-translate-y-1 transition duration-500 shadow-lg border border-white/5 ${item.href === '#' ? 'pointer-events-none opacity-30 shadow-none grayscale' : ''}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="pt-2">
          <h4 className="text-white font-black uppercase tracking-[3px] text-[10px] mb-8 flex items-center gap-2">
            Explore
            <span className="w-8 h-[2px] bg-orange-500/50 rounded-full"></span>
          </h4>
          <ul className="space-y-4 text-sm font-bold">
            {["Request Training", "Volunteer", "Donate", "About Us"].map((link, i) => (
              <li key={i}>
                <button 
                  onClick={() => {}} 
                  className="hover:text-orange-500 transition duration-300 flex items-center space-x-3 w-full text-left group"
                >
                  <span className="h-1.5 w-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="pt-2">
          <h4 className="text-white font-black uppercase tracking-[3px] text-[10px] mb-8 flex items-center gap-2">
            Connect
            <span className="w-8 h-[2px] bg-orange-500/50 rounded-full"></span>
          </h4>
          <div className="space-y-5">
             <div className="flex items-start space-x-3">
                <span className="text-orange-500 mt-1">📍</span>
                <p className="text-sm font-medium text-gray-400 leading-snug">{contact.address}</p>
             </div>
             <div className="flex items-center space-x-3">
                <span className="text-orange-500">📞</span>
                <p className="text-sm font-medium text-gray-400">{contact.phone}</p>
             </div>
             <div className="flex items-center space-x-3">
                <span className="text-orange-500">✉️</span>
                <p className="text-sm font-medium text-gray-400 opacity-80 hover:opacity-100 transition truncate">{contact.email}</p>
             </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="pt-2">
          <h4 className="text-white font-black uppercase tracking-[3px] text-[10px] mb-8 flex items-center gap-2">
            Newsletter
            <span className="w-8 h-[2px] bg-orange-500/50 rounded-full"></span>
          </h4>
          <p className="text-sm mb-6 text-gray-400 font-medium leading-relaxed">
            Get the latest tech opportunities delivered directly to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 group">
            <div className="relative">
              <input 
                required
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/5 focus:border-orange-500/50 text-sm text-white placeholder-gray-500 outline-none transition-all shadow-inner focus:bg-white/10"
              />
            </div>
            <button 
              disabled={submitting}
              type="submit" 
              className={`w-full py-4 rounded-xl text-white font-black uppercase tracking-widest text-[10px] transform active:scale-95 transition-all shadow-xl flex items-center justify-center space-x-2 ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20'}`}
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Subscribe Now</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/5 py-8 text-center text-[10px] font-black uppercase tracking-[4px] text-gray-500 bg-black/40">
        © {new Date().getFullYear()} <span className="text-white">Tech4All</span> — Empowering the Future with <span className="text-orange-400">LALA TECH</span>
      </div>
    </footer>
  );
}
