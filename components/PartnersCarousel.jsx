export default function PartnersCarousel(){
  const PARTNERS = ['/partners/partner1.png','/partners/partner2.png'];

  return (
    <section id="partners" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-xl font-semibold">Our Partners</h3>
        <div className="mt-6 overflow-hidden">
          <div className="flex gap-6 animate-marquee">
            {PARTNERS.concat(PARTNERS).map((p,i) => (
              <div key={i} className="flex-shrink-0 w-40 h-20 bg-gray-100 rounded flex items-center justify-center border">
                <img src={p} alt={`partner-${i}`} className="max-h-14 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; display:flex; }
      `}</style>
    </section>
  );
}
