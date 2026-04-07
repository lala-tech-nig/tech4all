"use client";
import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { API_BASE_URL } from '@/utils/api';
import { User, Mail, Sparkles, Send, Heart, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VolunteerModal({ onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    availability: '',
    reason: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          skills: `Role: ${form.role}, Availability: ${form.availability}, Reason: ${form.reason}`
        }),
      });
      if (res.ok) {
        window.dispatchEvent(new CustomEvent('show-confetti'));
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Sparkles className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
            <select
              required
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium appearance-none"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option value="">Select Role...</option>
              <option value="Facilitator">Training Facilitator</option>
              <option value="Media">Media & Content</option>
              <option value="Support">Field Support</option>
              <option value="Admin">Administrative</option>
            </select>
          </div>
        </div>

        <div className="relative group">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Availability</label>
            <div className="flex gap-4">
              {['Weekdays', 'Weekends', 'Evening'].map((time) => (
                <label key={time} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="accent-orange-500 w-4 h-4" 
                    onChange={(e) => {
                      const val = e.target.checked 
                        ? (form.availability ? `${form.availability}, ${time}` : time)
                        : form.availability.replace(time, '').replace(', ,', ',').trim();
                      setForm({...form, availability: val});
                    }}
                  />
                  <span className="text-xs font-bold text-gray-600 group-hover:text-orange-600 transition">{time}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="relative group">
          <Heart className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
          <textarea
            rows="3"
            required
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
            placeholder="Why do you want to join Tech4All?"
            value={form.reason}
            onChange={e => setForm({ ...form, reason: e.target.value })}
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

