'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setForm({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      console.error('Submission error', err);
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <h3 className="text-4xl font-extrabold text-center text-gray-800">Contact Us</h3>
        <p className="text-center text-lg text-gray-600 mt-3 max-w-lg mx-auto">
          We’d love to hear from you. Whether you have a question, feedback, or a project in mind — 
          let’s start the conversation today. 🚀
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
          </div>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
            required
          />

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-3 rounded-lg font-semibold shadow-md"
            >
              Send Message
            </button>
            <div className="text-sm text-gray-500 text-center sm:text-left">
              {sent
                ? '✅ Message sent! We’ll get back to you shortly.'
                : '⏳ Our team replies within 24–48 hours.'}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
