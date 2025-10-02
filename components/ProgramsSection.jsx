import React from 'react';

const PROGRAMS = [
  { id: 'repair', title: 'Phone & Laptop Repair', desc: 'Hands-on diagnostics and repair skills.' },
  { id: 'web', title: 'Website Development', desc: 'HTML, CSS, JS basics to launch websites.' },
  { id: 'intro', title: 'Intro to Computer', desc: 'OS, file systems, email, office tools.' },
  { id: 'dm', title: 'Digital Marketing', desc: 'Social media & small business marketing skills.' },
  { id: 'content', title: 'Content Creation', desc: 'Creating and editing visual/audio content.' },
  { id: 'market', title: 'Market Women Tech Skills', desc: 'Payments, inventory and online selling.' },
];

export default function ProgramsSection(){
  return (
    <section id="programs" className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">Programs</h3>
          <p className="text-sm text-gray-600">Practical, high-impact trainings tailored to communities.</p>
        </div>
        <a href="#contact" className="text-orange-500">Request a program →</a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.map(p => (
          <article key={p.id} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center font-bold">{p.title[0]}</div>
              <div>
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <a className="text-sm text-orange-500">Learn more</a>
              <a href="#contact" className="px-3 py-1 bg-black text-white rounded text-xs">Request</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
