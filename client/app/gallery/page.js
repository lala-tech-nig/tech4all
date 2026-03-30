"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// 🔥 Mock Event Data
const GALLERIES = [
  { 
    id: "g1", 
    title: "Olambe Akute — Week 1", 
    desc: "Community ICT training kickoff with exciting engagement and workshops.", 
    count: 18, 
    images: ["/events/e1-1.jpg","/events/e1-2.jpg","/events/e2-1.jpg","/events/e2-2.jpg"]
  },
  { 
    id: "g2", 
    title: "Computer Village Workshop", 
    desc: "Hands-on device repair and programming sessions with top engineers.", 
    count: 24, 
    images: ["/events/e2-1.jpg","/events/e1-2.jpg","/events/e1-1.jpg","/events/e3-1.jpg"]
  },
  { 
    id: "g3", 
    title: "Youth Coding Bootcamp", 
    desc: "Teens and young adults learning HTML, CSS, and JavaScript basics.", 
    count: 30, 
    images: ["/events/e3-1.jpg","/events/e3-2.jpg","/events/e3-3.jpg","/events/e3-4.jpg"]
  },
];

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);

  const openAlbum = (gallery) => {
    setActiveGallery(gallery);
    setOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">📸 Full Event Gallery</h1>
        <p className="text-gray-600 mt-2">
          Explore all event albums, open albums, and view photos in full size.
        </p>
      </div>

      {/* Gallery Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {GALLERIES.map((g) => (
          <div key={g.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            {/* Featured Image */}
            <Image 
              src={g.images[0]} 
              alt={g.title} 
              width={600} 
              height={400} 
              className="w-full h-56 object-cover"
            />

            {/* Description */}
            <div className="p-5">
              <h4 className="font-semibold text-lg">{g.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{g.desc}</p>
              <div className="text-xs text-gray-500 mt-2">{g.count} photos</div>

              <button 
                onClick={() => openAlbum(g)} 
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              >
                Open Album
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Album Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl max-w-5xl w-full p-6 overflow-y-auto max-h-[90vh]">
            {activeGallery && (
              <>
                <Dialog.Title className="text-xl font-bold mb-4">{activeGallery.title}</Dialog.Title>
                <p className="text-sm text-gray-600 mb-6">{activeGallery.desc}</p>

                {/* Lightbox Gallery */}
                <PhotoProvider>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {activeGallery.images.map((img, idx) => (
                      <PhotoView key={idx} src={img}>
                        <Image
                          src={img}
                          alt={`${activeGallery.title}-${idx}`}
                          width={400}
                          height={300}
                          className="w-full h-40 object-cover rounded-lg cursor-pointer"
                        />
                      </PhotoView>
                    ))}
                  </div>
                </PhotoProvider>

                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setOpen(false)} 
                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
