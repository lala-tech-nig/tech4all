'use client';
import { useState } from 'react';

export default function ContactForm(){
  const [form, setForm] = useState({ org: '', name: '', email: '', phone: '', message: ''});
  const [sent, setSent] = useState(false);

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();
    // TODO: POST to backend endpoint /api/requests or contact route
    console.log('Contact form', form);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ org: '', name: '', email: '', phone: '', message: ''});
  }

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h3 className="text-2xl font-bold text-center">Contact / Request Training</h3>
        <p className="text-center text-sm text-gray-600 mt-2">Fill this form to request a program, volunteer, or partner with us.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-white p-6 rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="org" value={form.org} onChange={handleChange} placeholder="Organization / Community" className="w-full border rounded px-4 py-2" />
            <input name="name" value={form.name} onChange={handleChange} placeholder="Contact name" className="w-full border rounded px-4 py-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full border rounded px-4 py-2" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border rounded px-4 py-2" />
          </div>

          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message / Details" rows="4" className="w-full border rounded px-4 py-2" />

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded-md">Send request</button>
            <div className="text-sm text-gray-500">{sent ? 'Request sent — we will contact you soon.' : 'We reply within 48 hours.'}</div>
          </div>
        </form>
      </div>
    </section>
  );
}
