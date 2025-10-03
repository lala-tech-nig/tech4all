"use client";

import { useState } from "react";

const ENTRIES = [
  // Volunteers
  {
    id: 1,
    category: "volunteer",
    name: "Aisha Bello",
    title: "Lead Trainer",
    photo: "/events/e1-1.jpg",
    badge: "Verified",
    joined: "Jan 2022",
    rating: 5,
    bio: "Aisha has trained over 300 youths in coding, web development, and entrepreneurship.",
  },
  {
    id: 2,
    category: "volunteer",
    name: "Michael Johnson",
    title: "Tech Mentor",
    photo: "/events/e1-2.jpg",
    badge: "Mentor",
    joined: "Aug 2021",
    rating: 4,
    bio: "Michael volunteers weekly, guiding students in building real-world mobile apps.",
  },
  {
    id: 3,
    category: "volunteer",
    name: "Fatima Yusuf",
    title: "Digital Marketing Coach",
    photo: "/events/e2-1.jpg",
    badge: "Coach",
    joined: "May 2023",
    rating: 5,
    bio: "Fatima empowers small businesses by training them on online growth strategies.",
  },

  // Communities
  {
    id: 4,
    category: "community",
    name: "Olambe Akute",
    title: "Community Beneficiary",
    photo: "/events/e1-2.jpg",
    badge: "500 trained",
    joined: "2024",
    rating: 5,
    bio: "Olambe Akute community has benefited from free ICT training with over 500 trained participants.",
  },
  {
    id: 5,
    category: "community",
    name: "Agege Youth Center",
    title: "Beneficiary",
    photo: "/events/e1-1.jpg",
    badge: "200 youths",
    joined: "2023",
    rating: 4,
    bio: "The Agege Youth Center partnered with Tech4All to train 200 youths in computer literacy.",
  },
  {
    id: 6,
    category: "community",
    name: "Oshodi Market Women",
    title: "Beneficiary",
    photo: "/events/e2-1.jpg",
    badge: "150 trained",
    joined: "2022",
    rating: 4,
    bio: "Oshodi women entrepreneurs learned digital payments and online selling skills.",
  },

  // Organizations
  {
    id: 7,
    category: "organization",
    name: "DevHub Foundation",
    title: "Partner",
    photo: "/partners/partner1.png",
    badge: "Partner",
    joined: "2019",
    rating: 5,
    bio: "DevHub Foundation partners with Tech4All to empower African tech talents.",
  },
  {
    id: 8,
    category: "organization",
    name: "Code4Naija",
    title: "Partner",
    photo: "/partners/partner2.png",
    badge: "Partner",
    joined: "2020",
    rating: 4,
    bio: "Code4Naija provides coding bootcamps and collaborates on hackathons.",
  },
  {
    id: 9,
    category: "organization",
    name: "FutureNet Africa",
    title: "Partner",
    photo: "/partners/partner3.png",
    badge: "Partner",
    joined: "2021",
    rating: 5,
    bio: "FutureNet Africa has sponsored several ICT hubs across Nigeria.",
  },

  // Donors
  {
    id: 10,
    category: "donor",
    name: "Mr. Chukwu",
    title: "Gold Donor",
    photo: "/partners/partner1.png",
    badge: "Gold",
    joined: "2020",
    rating: 5,
    bio: "Mr Chukwu has been a strong financial supporter of Tech4All initiatives since 2020.",
  },
  {
    id: 11,
    category: "donor",
    name: "Mrs. Ade",
    title: "Silver Donor",
    photo: "/partners/partner2.png",
    badge: "Silver",
    joined: "2021",
    rating: 4,
    bio: "Mrs Ade contributes annually to sponsor female students into tech programs.",
  },
  {
    id: 12,
    category: "donor",
    name: "TechStars Africa",
    title: "Corporate Donor",
    photo: "/partners/partner3.png",
    badge: "Corporate",
    joined: "2022",
    rating: 5,
    bio: "TechStars Africa sponsors infrastructure, devices, and scholarship programs.",
  },
];

export default function HallOfFamePage() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "volunteer", "community", "organization", "donor"];

  const filteredEntries = ENTRIES.filter((entry) => {
    const matchesCategory =
      activeCategory === "all" || entry.category === activeCategory;
    const matchesSearch =
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.title.toLowerCase().includes(search.toLowerCase()) ||
      entry.bio.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-black">
        Hall of Fame
      </h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name, title, or bio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-black text-white hover:bg-orange-500"
              }`}
            >
              {cat === "all"
                ? "All"
                : cat.charAt(0).toUpperCase() + cat.slice(1) + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredEntries.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEntries.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelected(f)}
            >
              <img
                src={f.photo}
                alt={f.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-4">
                <div className="font-semibold text-black">{f.name}</div>
                <div className="text-sm text-gray-600">{f.title}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                    {f.badge}
                  </span>
                  <span className="text-xs text-gray-500">
                    Joined {f.joined}
                  </span>
                </div>
                <div className="mt-2 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`${
                        i < f.rating ? "text-orange-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full rounded-xl p-6 relative shadow-lg">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-orange-500"
            >
              ✖
            </button>
            <img
              src={selected.photo}
              alt={selected.name}
              className="w-full h-56 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-xl font-bold text-black">
              {selected.name}
            </h3>
            <p className="text-sm text-gray-600">{selected.title}</p>
            <p className="mt-2 text-gray-700">{selected.bio}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Joined {selected.joined}
              </span>
              <div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`${
                      i < selected.rating ? "text-orange-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
