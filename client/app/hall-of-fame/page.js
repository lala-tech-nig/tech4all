import HallOfFame from '@/components/HallOfFame';

export const metadata = {
  title: 'Hall of Fame — Tech4All',
  description: 'Our top contributors and high-ranking volunteers.',
};

export default function HallOfFamePage() {
  return (
    <div className="pb-20">
      <div className="bg-gray-950 pt-32 pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h1 className="text-6xl font-black text-white tracking-widest uppercase mb-4 mb-6">
             Hall of <span className="text-orange-500">Fame</span>
           </h1>
           <p className="text-gray-400 max-w-2xl mx-auto font-medium text-lg italic leading-relaxed">
             Special recognition for individuals who have dedicated their time and skills to making a difference.
           </p>
        </div>
      </div>
      <HallOfFame />
    </div>
  );
}
