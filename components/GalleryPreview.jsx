import Image from 'next/image';
import Link from 'next/link';

const GALLERIES = [
  { id: 'g1', title: 'Olambe Akute — Week 1', count: 18, thumbs: ['/events/e1-1.jpg','/events/e1-2.jpg','/events/e2-1.jpg']},
  { id: 'g2', title: 'Computer Village Workshop', count: 24, thumbs: ['/events/e1-2.jpg','/events/e2-1.jpg','/events/e1-1.jpg']},
];

export default function GalleryPreview(){
  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Photo Gallery</h3>
          <p className="text-sm text-gray-600">Browse event albums and view full catalogues.</p>
        </div>
        <Link href="/gallery" className="text-orange-500">View more →</Link>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERIES.map(g => (
          <div key={g.id} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{g.title}</h4>
                <div className="text-sm text-gray-500">{g.count} photos</div>
              </div>
              <div className="text-3xl">📁</div>
            </div>
            <div className="grid grid-cols-3 gap-1 p-3">
              {g.thumbs.map((t, i) => (
                <Image key={i} src={t} alt={`${g.title}-thumb-${i}`} width={300} height={200} className="h-24 w-full object-cover rounded" />
              ))}
            </div>
            <div className="p-3 border-t flex items-center justify-between">
              <Link href="/gallery" className="text-orange-500">Open album</Link>
              <div className="text-sm text-gray-500">{g.count} photos</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
