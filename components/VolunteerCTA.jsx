export default function VolunteerCTA(){
  return (
    <section id="volunteer" className="bg-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Share your skills — Volunteer</h3>
          <p className="text-sm text-gray-700 mt-1">Teach, mentor or support our local events and online classes.</p>
        </div>
        <div className="flex gap-3">
          <a href="#contact" className="px-5 py-3 bg-black text-white rounded">Become a Volunteer</a>
          <a href="#contact" className="px-5 py-3 border border-black rounded">Learn roles</a>
        </div>
      </div>
    </section>
  );
}
