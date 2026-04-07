import ProgramsSection from '@/components/ProgramsSection';

export const metadata = {
  title: 'Our Programs — Tech4All',
  description: 'Explore our technology training programs designed to empower communities.',
};

export default function ProgramsPage() {
  return (
    <div className="pb-20">
      <div className="bg-gray-50 pt-24 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
           <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">
             Empowering <span className="text-orange-600">Programs</span>
           </h1>
           <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
             From coding to digital literacy, our programs are designed to bridge the technology gap for everyone.
           </p>
        </div>
      </div>
      <ProgramsSection />
    </div>
  );
}
