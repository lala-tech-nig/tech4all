'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const SLIDES = [
  { src: '/hero1.jpg', title: 'Empowering communities with free tech training', subtitle: 'Request a program for your community or volunteer to teach.' },
  { src: '/hero2.jpg', title: 'Hands-on Phone & Laptop Repair', subtitle: 'Practical device repair skills for livelihoods.' },
  { src: '/hero3.jpg', title: 'Digital Skills for Market Women', subtitle: 'Payments, inventory and online selling skills.' }
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {SLIDES.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <Image src={s.src} alt={s.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/45 flex items-center">
            <div className="max-w-4xl mx-auto px-6 text-white">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">{s.title}</h2>
              <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow">{s.subtitle}</p>
              <div className="mt-8 flex gap-4">
                <a href="#contact" className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md font-semibold shadow">Request Training</a>
                <a href="#contact" className="bg-white text-orange-600 px-6 py-3 rounded-md font-semibold">Volunteer</a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}></button>
        ))}
      </div>
    </section>
  );
}
