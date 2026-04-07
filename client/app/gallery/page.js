import GalleryPreview from '@/components/GalleryPreview';

export const metadata = {
  title: 'Our Gallery — Tech4All',
  description: 'Moments from our various sessions and community impact across Nigeria.',
};

export default function GalleryPage() {
  return (
    <div className="pb-20">
      <div className="bg-orange-50/50 pt-24 pb-16 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6">
           <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4 uppercase italic">
             Gallery <span className="text-orange-600">&</span> Impact
           </h1>
           <p className="text-sm font-bold text-gray-500 uppercase tracking-[4px]">Relive the memories of our impact.</p>
        </div>
      </div>
      <GalleryPreview />
    </div>
  );
}
