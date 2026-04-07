"use client";
import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { API_BASE_URL } from '@/utils/api';
import { Send, User, MessageCircle, Mail, Phone, Briefcase, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TrainingModal({ onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    participantCount: '',
    demographic: '',
    preferredDate: '',
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
          programName: 'General Training inquiry',
          message: `${form.message}\n\n[Details: ${form.participantCount} participants, Target: ${form.demographic}, Preferred Date: ${form.preferredDate}]`
        }),
      });

      if (res.ok) {
        window.dispatchEvent(new CustomEvent('show-confetti'));
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
            <Users className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
            <input
              required
              type="number"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
              placeholder="Participants Count"
              value={form.participantCount}
              onChange={e => setForm({ ...form, participantCount: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <Briefcase className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
            <select
              required
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium appearance-none"
              value={form.demographic}
              onChange={e => setForm({ ...form, demographic: e.target.value })}
            >
              <option value="">Target Demographic...</option>
              <option value="Youths">Youths (15–30)</option>
              <option value="Children">Children (Below 15)</option>
              <option value="Adults">Adults (30+)</option>
              <option value="Corporate">Corporate / Professionals</option>
            </select>
          </div>
          <div className="relative group">
            <input
              required
              type="date"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
              value={form.preferredDate}
              onChange={e => setForm({ ...form, preferredDate: e.target.value })}
            />
          </div>
        </div>

        <div className="relative group">
           <MessageCircle className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
           <textarea
             rows="3"
             className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
             placeholder="Additional details or specific needs..."
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
