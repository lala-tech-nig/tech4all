'use client';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-300 overflow-hidden mt-20">
      {/* Background Accent Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-purple-500/10 to-transparent blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-lg shadow-md w-fit">
            <img 
              src="/tech4alllogonewnew.png" 
              alt="Tech4All Logo" 
              className="w-32 object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            <span className="font-semibold text-white">Tech4All</span> by LALA TECH — 
            empowering youths and communities worldwide with free technology training.
          </p>

          <div className="flex space-x-3 mt-4">
            {[
              {icon: <FaFacebookF size={16} />, href: "#"},
              {icon: <FaTwitter size={16} />, href: "#"},
              {icon: <FaInstagram size={16} />, href: "#"},
              {icon: <FaYoutube size={16} />, href: "#"},
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href} 
                className="p-2.5 rounded-full bg-gray-800 hover:bg-orange-500 text-gray-300 hover:text-white transform hover:scale-110 transition duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3 relative">
            Quick Links
            <span className="absolute left-0 -bottom-1 w-12 h-0.5 bg-orange-500 rounded-full animate-pulse"></span>
          </h4>
          <ul className="space-y-2 text-sm">
            {["Request Training", "Volunteer", "Donate", "About Us"].map((link, i) => (
              <li key={i}>
                <a 
                  href="#" 
                  className="hover:text-orange-400 transition duration-200 flex items-center space-x-2"
                >
                  <span className="h-1.5 w-1.5 bg-orange-500 rounded-full"></span>
                  <span>{link}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3 relative">
            Contact
            <span className="absolute left-0 -bottom-1 w-12 h-0.5 bg-orange-500 rounded-full animate-pulse"></span>
          </h4>
          <p className="text-sm">📍 12 LALA TECH Hub, Olambe-Akute, Ogun State, Nigeria</p>
          <p className="text-sm mt-2">📞 +234 812 144 4306</p>
          <p className="text-sm mt-1">✉️ lalatechnigltd@gmail.com</p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3 relative">
            Newsletter
            <span className="absolute left-0 -bottom-1 w-12 h-0.5 bg-orange-500 rounded-full animate-pulse"></span>
          </h4>
          <p className="text-sm mb-3 text-gray-400">
            Be the first to know about upcoming trainings, events, and opportunities.
          </p>
          <form className="flex group">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-3 py-2 rounded-l-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 text-sm text-white placeholder-gray-400 outline-none"
            />
            <button 
              type="submit" 
              className="bg-orange-500 px-4 py-2 rounded-r-md text-white font-medium hover:bg-orange-600 transition relative overflow-hidden"
            >
              <span className="relative z-10">Subscribe</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 opacity-0 group-hover:opacity-100 transition duration-500"></span>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800 py-3 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-medium">Tech4All</span> — Built with ❤️ by <span className="text-orange-400">LALA TECH</span>
      </div>
    </footer>
  );
}
