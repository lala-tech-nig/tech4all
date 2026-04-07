"use client";
import Modal from "./Modal";
import { useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import { User, Mail, Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RequestModal({ programName, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, programName }),
      });

      if (response.ok) {
        toast.success(`Success! Request for ${programName} sent.`);
        window.dispatchEvent(new CustomEvent('show-confetti'));
        onClose();
      } else {

        toast.error('Failed to submit enrollment request.');
      }
    } catch (err) {
      toast.error('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="text-center mb-8 pt-2">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-orange-200">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight uppercase">
          Enroll: {programName}
        </h3>
        <p className="text-gray-500 text-sm mt-2">Fill the form below to start your journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <User className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
          />
        </div>

        <div className="relative group">
          <Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
          />
        </div>

        <div className="relative group">
          <Phone className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
          />
        </div>

        <div className="relative group">
          <MessageCircle className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition" size={18} />
          <textarea
            name="message"
            placeholder="Additional details (optional)"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition text-sm font-medium"
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
              <span className="uppercase tracking-widest text-[12px] font-black">Confirm Enrollment</span>
              <Send size={16} strokeWidth={3} />
            </>
          )}
        </button>
      </form>
    </Modal>
  );
}

