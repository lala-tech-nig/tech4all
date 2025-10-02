"use client";

import { useState } from 'react';

const ENTRIES = [
  { id:1, category: 'volunteer', name: 'Aisha Bello', title: 'Lead Trainer', photo: '/events/e1-1.jpg', badge: 'Verified' },
  { id:2, category: 'community', name: 'Olambe Akute', title: 'Community Beneficiary', photo: '/events/e1-2.jpg', badge: '500 trained' },
  { id:3, category: 'organization', name: 'DevHub Foundation', title: 'Partner', photo: '/events/e2-1.jpg', badge: 'Partner' },
  { id:4, category: 'donor', name: 'Mr. Chukwu', title: 'Gold Donor', photo: '/partners/partner1.png', badge: 'Gold' },
];

export default function HallOfFame(){
  const [tab, setTab] = useState('volunteer');
  const filtered = ENTRIES.filter(e => {
    if(tab === 'volunteer') return e.category === 'volunteer';
    if(tab === 'organization') return e.category === 'organization';
    if(tab === 'community') return e.category === 'community';
    if(tab === 'donor') return e.category === 'donor';
    return true;
  });

  return (
    <section id="hall" className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Hall of Fame</h3>
          <p className="text-sm text-gray-600">Honouring volunteers, communities, organizations and donors.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setTab('volunteer')} className={`px-3 py-1 rounded ${tab==='volunteer' ? 'bg-orange-500 text-white' : 'border bg-white'}`}>Volunteers</button>
          <button onClick={() => setTab('organization')} className={`px-3 py-1 rounded ${tab==='organization' ? 'bg-orange-500 text-white' : 'border bg-white'}`}>Organizations</button>
          <button onClick={() => setTab('community')} className={`px-3 py-1 rounded ${tab==='community' ? 'bg-orange-500 text-white' : 'border bg-white'}`}>Communities</button>
          <button onClick={() => setTab('donor')} className={`px-3 py-1 rounded ${tab==='donor' ? 'bg-orange-500 text-white' : 'border bg-white'}`}>Donors</button>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map(f => (
          <div key={f.id} className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="flex gap-4 items-center">
              <img src={f.photo} alt={f.name} className="w-16 h-16 object-cover rounded-full" />
              <div>
                <div className="font-semibold">{f.name}</div>
                <div className="text-sm text-gray-600">{f.title}</div>
                <div className="mt-2"><span className="inline-block bg-black text-white text-xs px-2 py-0.5 rounded">{f.badge}</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
