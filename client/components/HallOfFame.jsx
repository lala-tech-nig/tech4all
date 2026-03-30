"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import Link from "next/link";

export default function HallOfFamePage() {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("volunteer");
  const [loading, setLoading] = useState(true);

  const categories = ["volunteer", "community", "organization", "donor"];

  useEffect(() => {
    fetch(`${API_BASE_URL}/hall-of-fame`)
      .then(res => res.json())
      .then(data => setEntries(data))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredEntries = entries.filter(
    (entry) => entry.category === activeCategory
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header + Filter row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-black">Hall of Fame</h2>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <p className="hidden md:block text-gray-600 italic font-medium">
            Celebrating the heroes making tech accessible for everyone 🚀
          </p>
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
                {cat.charAt(0).toUpperCase() + cat.slice(1)}s
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-400 py-20">Loading...</p>
      ) : filteredEntries.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEntries.map((f) => (
            <div
              key={f._id}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelected(f)}
            >
              <img
                src={f.photo}
                alt={f.name}
                className="w-full h-40 object-cover rounded-lg"
                onError={(e) => { e.target.src = 'https://placehold.co/400x300/f3f4f6/9ca3af?text=Photo'; }}
              />
              <div className="mt-4">
                <div className="font-semibold text-black">{f.name}</div>
                <div className="text-sm text-gray-600">{f.title}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                    {f.badge}
                  </span>
                  <span className="text-xs text-gray-500">Joined {f.joined}</span>
                </div>
                <div className="mt-2 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < f.rating ? "text-orange-500" : "text-gray-300"}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-20">No entries in this category yet.</p>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-lg w-full rounded-xl p-6 relative shadow-lg">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-orange-500 text-xl"
            >✖</button>
            <img
              src={selected.photo}
              alt={selected.name}
              className="w-full h-56 object-cover rounded-lg"
              onError={(e) => { e.target.src = 'https://placehold.co/600x400/f3f4f6/9ca3af?text=Photo'; }}
            />
            <h3 className="mt-4 text-xl font-bold text-black">{selected.name}</h3>
            <p className="text-sm text-gray-600">{selected.title}</p>
            <p className="mt-2 text-gray-700">{selected.bio}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Joined {selected.joined}</span>
              <div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < selected.rating ? "text-orange-500" : "text-gray-300"}>★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Link
          href="/hall-of-fame"
          className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
        >
          View Full Hall Of Fame →
        </Link>
      </div>
    </section>
  );
}
