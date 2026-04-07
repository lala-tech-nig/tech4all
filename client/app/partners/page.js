import PartnersCarousel from '@/components/PartnersCarousel';

export const metadata = {
  title: 'Our Partners — Tech4All',
  description: 'The organizations and communities making Tech4All possible.',
};

export default function PartnersPage() {
  return (
    <div className="pb-20">
      <div className="bg-white pt-24 pb-16 border-b border-gray-50 text-center">
        <div className="max-w-7xl mx-auto px-6">
           <h1 className="text-5xl font-black text-gray-900 tracking-tight lowercase italic">
             Our <span className="text-orange-500">Network</span>
           </h1>
           <p className="text-xs font-black text-gray-400 uppercase tracking-[6px] mt-4">Growth through collaboration.</p>
        </div>
      </div>
      <PartnersCarousel />
    </div>
  );
}
