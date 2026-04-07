"use client";
import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { API_BASE_URL } from '@/utils/api';
import { User, Mail, Sparkles, Send, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VolunteerModal({ onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    skills: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        onSubmit(form.name);
      } else {
        toast.error('Submission failed.');
      }
    } catch {
      toast.error('Server error. Please try later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="text-center mb-8 pt-2">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-orange-200 shadow-sm animate-pulse">
          <Heart size={32} fill="currentColor" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 leading-tight">Volunteer With Us</h2>
        <p className="text-gray-500 mt-2 font-medium italic">"The best way to find yourself is to lose yourself in the service of others."</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative group">
          <User className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
          <input
            required
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="relative group">
          <Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
          <input
            required
            type="email"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="relative group">
          <Sparkles className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
          <textarea
            rows="3"
            required
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
            placeholder="What skills can you share? (e.g. Graphic Design, Coding, Outreach)"
            value={form.skills}
            onChange={e => setForm({ ...form, skills: e.target.value })}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl shadow-xl transition transform hover:-translate-y-0.5 active:scale-95 disabled:bg-gray-400 flex items-center justify-center space-x-3 group"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span className="uppercase tracking-widest text-[12px] font-black">Submit Application</span>
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </ModalWrapper>
  );
}

