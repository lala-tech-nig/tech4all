export default function PartnersCarousel() {
  const PARTNERS = [
    '/partners/partner1.png',
    '/partners/partner2.png',
    '/partners/partner3.png',
    '/partners/partner4.png',
    '/partners/partner5.png',
  ];

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
          {PARTNERS.concat(PARTNERS).map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 h-20 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100"
            >
              <img
                src={p}
                alt={`partner-${i}`}
                className="max-h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lane 2 (reverse direction) */}
      <div className="mt-6 overflow-hidden">
        <div className="flex gap-8 animate-marquee-reverse">
          {PARTNERS.concat(PARTNERS).map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 h-20 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100"
            >
              <img
                src={p}
                alt={`partner-${i}`}
                className="max-h-12 object-contain"
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
