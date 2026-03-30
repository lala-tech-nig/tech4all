'use client';
import { useEffect, useState } from 'react';

export default function PartnersCarousel() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/partners')
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(() => {
        // fallback to local assets if API unreachable
        setPartners([
          { _id: '1', logoUrl: '/partners/partner1.png', name: 'Partner 1' },
          { _id: '2', logoUrl: '/partners/partner2.png', name: 'Partner 2' },
          { _id: '3', logoUrl: '/partners/partner3.png', name: 'Partner 3' },
          { _id: '4', logoUrl: '/partners/partner4.png', name: 'Partner 4' },
          { _id: '5', logoUrl: '/partners/partner5.png', name: 'Partner 5' },
        ]);
      });
  }, []);

  if (partners.length === 0) return null;

  return (
    <section id="partners" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
          Our Trusted Partners
        </h3>
        <p className="mt-2 text-gray-500 text-sm">
          Collaborating with the best to empower technology for all
        </p>
      </div>

      {/* Lane 1 */}
      <div className="mt-10 overflow-hidden">
        <div className="flex gap-8 animate-marquee">
          {partners.concat(partners).map((p, i) => (
            <div
              key={`a-${i}`}
              className="flex-shrink-0 w-40 h-20 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100"
            >
              <img
                src={p.logoUrl}
                alt={p.name}
                className="max-h-12 object-contain"
                onError={(e) => { e.target.src = 'https://placehold.co/160x60/f3f4f6/9ca3af?text=Logo'; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lane 2 (reverse direction) */}
      <div className="mt-6 overflow-hidden">
        <div className="flex gap-8 animate-marquee-reverse">
          {partners.concat(partners).map((p, i) => (
            <div
              key={`b-${i}`}
              className="flex-shrink-0 w-40 h-20 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100"
            >
              <img
                src={p.logoUrl}
                alt={p.name}
                className="max-h-12 object-contain"
                onError={(e) => { e.target.src = 'https://placehold.co/160x60/f3f4f6/9ca3af?text=Logo'; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          display: flex;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 25s linear infinite;
          display: flex;
        }
      `}</style>
    </section>
  );
}
