'use client';
import { useState } from 'react';
import { API_BASE_URL } from '@/utils/api';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
        toast.success("Message sent! We'll get back to you shortly.");
        window.dispatchEvent(new CustomEvent('show-confetti'));
        setTimeout(() => setSent(false), 5000);
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <h3 className="text-4xl font-extrabold text-center text-gray-800 tracking-tight">Contact Us</h3>
        <p className="text-center text-lg text-gray-500 mt-3 max-w-lg mx-auto font-medium">
          Have questions or want to partner with us? Reach out today. 🚀
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 bg-white p-8 rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-gray-50 border border-transparent focus:border-orange-500/30 rounded-xl px-5 py-4 text-gray-700 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                type="email"
                className="w-full bg-gray-50 border border-transparent focus:border-orange-500/30 rounded-xl px-5 py-4 text-gray-700 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+234 ..."
              className="w-full bg-gray-50 border border-transparent focus:border-orange-500/30 rounded-xl px-5 py-4 text-gray-700 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">How can we help?</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us more about your inquiry..."
              rows="4"
              className="w-full bg-gray-50 border border-transparent focus:border-orange-500/30 rounded-xl px-5 py-4 text-gray-700 focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition"
              required
            />
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4">
            <button
              disabled={submitting}
              type="submit"
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl transition transform active:scale-[0.98] flex items-center justify-center space-x-2 ${submitting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-black shadow-gray-900/10 hover:-translate-y-0.5'}`}
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Message</span>
                </>
              )}
            </button>
            <div className={`text-[10px] text-center font-bold uppercase tracking-widest transition-opacity duration-500 ${sent ? 'text-emerald-500' : 'text-gray-400'}`}>
              {sent
                ? '✅ Message received successfully'
                : '🛡️ We respect your privacy & reply within 24h'}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
