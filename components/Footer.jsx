'use client';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        
        {/* Logo & About */}
        <div>
          <img src="/tech4allogonewnew.png" alt="Tech4All Logo" className="w-36 mb-4" />
          <p className="text-sm leading-relaxed">
            Tech4All by <span className="font-semibold">LALA TECH</span> — 
            empowering youths and communities with free technology training worldwide.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-white"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-white"><FaYoutube size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Request Training</a></li>
            <li><a href="#" className="hover:text-white">Volunteer</a></li>
            <li><a href="#" className="hover:text-white">Donate</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Contact</h4>
          <p className="text-sm">📍 12 LALA TECH Hub, Olambe-Akute, Ogun State, Nigeria</p>
          <p className="text-sm mt-2">📞 +234 812 144 4306</p>
          <p className="text-sm mt-1">✉️ lalatechnigltd@gmail.com</p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Newsletter</h4>
          <p className="text-sm mb-3">Stay updated on upcoming trainings and community events.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
            />
            <button 
              type="submit" 
              className="bg-orange-500 px-4 py-2 rounded-r-md text-white font-semibold hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tech4All — Built with ❤️ by LALA TECH
      </div>
    </footer>
  );
}
