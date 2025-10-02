import Image from 'next/image';
import Link from 'next/link';

const PHOTOS = [
  '/events/e1-1.jpg',
  '/events/e1-2.jpg',
  '/events/e2-1.jpg',
  '/events/e1-1.jpg',
  '/events/e1-2.jpg',
  '/events/e2-1.jpg'
];

export default function GalleryPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gallery — All Photos</h1>
        <Link href="/" className="text-orange-500">← Back home</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {PHOTOS.map((src, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-lg bg-white transform hover:scale-105 transition">
            <Image src={src} alt={`photo-${i}`} width={800} height={600} className="object-cover w-full h-56" />
          </div>
        ))}
      </div>
    </section>
  );
}
