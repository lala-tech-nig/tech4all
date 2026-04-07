import VolunteerCTA from '@/components/VolunteerCTA';

export const metadata = {
  title: 'Become a Volunteer — Tech4All',
  description: 'Join our mission to eradicate computer illiteracy. Volunteer your skills and change lives.',
};

export default function VolunteerPage() {
  return (
    <div className="pb-20">
      <div className="bg-orange-50 pt-32 pb-16 border-b border-orange-100/50">
        <div className="max-w-7xl mx-auto px-6">
           <h1 className="text-6xl font-black text-gray-900 tracking-tighter mb-4">
             Wanna <span className="text-orange-600">Join</span> Us?
           </h1>
           <p className="text-xl text-gray-600 max-w-2xl leading-relaxed italic">
             "Unity is strength... when there is teamwork and collaboration, wonderful things can be achieved."
           </p>
        </div>
      </div>
      
      {/* Reusing the CTA structure but it works well as a main page section */}
      <VolunteerCTA />
      
      {/* Additional page content to make it feel like a full page */}
      <div className="max-w-7xl mx-auto px-6 py-20 bg-gray-900 rounded-[3rem] text-white my-20">
         <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
               <h4 className="text-orange-500 font-bold uppercase tracking-widest text-xs">Our Requirement</h4>
               <h3 className="text-2xl font-black">Passion First</h3>
               <p className="text-gray-400 text-sm">We don't just look for experts; we look for individuals with a burning desire to help others grow.</p>
            </div>
            <div className="space-y-4">
               <h4 className="text-orange-500 font-bold uppercase tracking-widest text-xs">The Commitment</h4>
               <h3 className="text-2xl font-black">Flexible Hours</h3>
               <p className="text-gray-400 text-sm">Whether you have 2 hours a week or 20, there's a place for you to make an impact.</p>
            </div>
            <div className="space-y-4">
               <h4 className="text-orange-500 font-bold uppercase tracking-widest text-xs">The Reward</h4>
               <h3 className="text-2xl font-black">Certifications</h3>
               <p className="text-gray-400 text-sm">All our volunteers receive official recognition and certificates from LALA TECH Hub.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
