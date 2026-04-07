"use client";
import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { API_BASE_URL } from '@/utils/api';
import { Send, User, MessageCircle, Mail, Phone, Briefcase, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TrainingModal({ onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    persona: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          programName: 'General Training inquiry'
        }),
      });
      if (res.ok) {
        onSubmit(form.name); 
      } else {
        toast.error('Failed to submit request.');
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
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-orange-200">
          <Send size={32} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 leading-tight">Request Training</h2>
        <p className="text-gray-500 mt-2 font-medium">Empower your community with technology</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <User className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
            <input
              required
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
              placeholder="Full Name / Org"
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <Phone className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
            <input
              required
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
              placeholder="Phone Number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="relative group">
            <Briefcase className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
            <select
              required
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium appearance-none"
              value={form.persona}
              onChange={e => setForm({ ...form, persona: e.target.value })}
            >
              <option value="">I am a...</option>
              <option value="Individual">Individual</option>
              <option value="Organization">Organization</option>
              <option value="Community">Community Leader</option>
              <option value="School">School/Institution</option>
            </select>
          </div>
        </div>

        <div className="relative group">
           <MessageCircle className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
           <textarea
             rows="3"
             className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
             placeholder="Tell us what you need..."
             value={form.message}
             onChange={e => setForm({ ...form, message: e.target.value })}
           />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-[0_15px_30px_-5px_rgba(234,88,12,0.3)] transition transform hover:-translate-y-0.5 active:scale-95 disabled:bg-gray-300 disabled:shadow-none flex items-center justify-center space-x-2"
        >
          {loading ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span className="uppercase tracking-widest text-[12px] font-black">Submit Request</span>
              <Send size={16} strokeWidth={4} />
            </>
          )}
        </button>
      </form>
    </ModalWrapper>
  );
}

