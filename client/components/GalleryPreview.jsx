"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function GalleryPreview() {
  const [open, setOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/gallery`)
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  // Group images by category to create "Albums"
  const albums = images.reduce((acc, img) => {
    const category = img.category || 'General';
    if (!acc[category]) {
      acc[category] = {
        id: category,
        title: category.charAt(0).toUpperCase() + category.slice(1),
        desc: `Photos from our ${category} events and activities.`,
        images: [],
        count: 0
      };
    }
    acc[category].images.push(img.url);
    acc[category].count += 1;
    return acc;
  }, {});

  const albumList = Object.values(albums);

  const openAlbum = (gallery) => {
    setActiveGallery(gallery);
    setOpen(true);
  };

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">📸 Photo Gallery</h3>
          <p className="text-sm text-gray-600">Browse event albums and relive the memories.</p>
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading gallery...</div>
      ) : albumList.length > 0 ? (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {albumList.map((g) => (
            <div key={g.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition group">
              {/* Featured Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image 
                  src={g.images[0]} 
                  alt={g.title} 
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Description */}
              <div className="p-5">
                <h4 className="font-semibold text-lg text-gray-900">{g.title}</h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{g.desc}</p>
                <div className="text-[10px] uppercase font-black tracking-widest text-orange-500 mt-2">
                  {g.count} photos
                </div>

                <button 
                  onClick={() => openAlbum(g)} 
                  className="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  Open Album
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 py-20 text-center border-2 border-dashed rounded-3xl bg-gray-50 text-gray-400">
           No photos in the gallery yet. Start adding some from the admin dashboard!
        </div>
      )}

      {/* View Full Gallery Link */}
      <div className="flex justify-center mt-10">
        <Link 
          href="/gallery" 
          className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-orange-600 transition shadow-lg shadow-gray-900/10"
        >
          View Full Gallery →
        </Link>
      </div>

      {/* Modal for Viewing Album */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-[60]">
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl max-w-4xl w-full p-8 overflow-y-auto max-h-[90vh] shadow-2xl scale-in-center">
            {activeGallery && (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-gray-900">{activeGallery.title}</Dialog.Title>
                    <p className="text-sm text-gray-500">{activeGallery.desc}</p>
                  </div>
                  <button 
                    onClick={() => setOpen(false)} 
                    className="p-2 text-gray-400 hover:text-orange-500 transition"
                  >
                    <span className="text-2xl">✖</span>
                  </button>
                </div>

                {/* Image Lightbox */}
                <PhotoProvider>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {activeGallery.images.map((img, idx) => (
                      <PhotoView key={idx} src={img}>
                        <div className="relative h-40 w-full rounded-xl overflow-hidden cursor-zoom-in group">
                          <Image
                            src={img}
                            alt={`${activeGallery.title}-${idx}`}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-110"
                          />
                        </div>
                      </PhotoView>
                    ))}
                  </div>
                </PhotoProvider>

                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={() => setOpen(false)} 
                    className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition"
                  >
                    Close Album
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}
