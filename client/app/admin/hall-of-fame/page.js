'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';
import { Plus, Pencil, Trash2, X, Star, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['volunteer', 'community', 'organization', 'donor'];
const EMPTY_FORM = { name: '', title: '', photo: '', bio: '', badge: '', category: 'volunteer', rating: 5, joined: '', isActive: true };

export default function AdminHallOfFame() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [activeCategory, setActiveCategory] = useState('all');

  const token = () => localStorage.getItem('adminToken');

  const fetchEntries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/hall-of-fame?admin=true`);
      setEntries(await res.json());
    } catch { toast.error('Failed to load entries'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchEntries(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setIsModalOpen(true); };
  const openEdit = (entry) => { setEditing(entry); setForm(entry); setIsModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editing
      ? `${API_BASE_URL}/hall-of-fame/${editing._id}`
      : `${API_BASE_URL}/hall-of-fame`;
    const method = editing ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify(form),
      });
      if (res.ok) { toast.success(editing ? 'Entry updated' : 'Entry added'); setIsModalOpen(false); fetchEntries(); }
    } catch { toast.error('Server error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    try {
      await fetch(`${API_BASE_URL}/hall-of-fame/${id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token()}` }
      });
      toast.success('Deleted'); fetchEntries();
    } catch { toast.error('Delete failed'); }
  };

  const toggleActive = async (entry) => {
    try {
      await fetch(`${API_BASE_URL}/hall-of-fame/${entry._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ ...entry, isActive: !entry.isActive }),
      });
      fetchEntries();
    } catch { toast.error('Toggle failed'); }
  };

  const filtered = activeCategory === 'all' ? entries : entries.filter(e => e.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hall of Fame</h1>
          <p className="text-gray-500 text-sm">Manage volunteers, communities, organizations & donors featured on the site</p>
        </div>
        <button onClick={openCreate} className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">
          <Plus size={18} /><span>Add Entry</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${activeCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All ({entries.length})</button>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition ${activeCategory === cat ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {cat}s ({entries.filter(e => e.category === cat).length})
          </button>
        ))}
      </div>

      {loading ? <p className="py-20 text-center text-gray-400">Loading entries...</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(entry => (
            <div key={entry._id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden group transition hover:shadow-md ${!entry.isActive ? 'opacity-50 grayscale' : ''}`}>
              <div className="relative h-40">
                <img src={entry.photo} alt={entry.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://placehold.co/400x300/f3f4f6/9ca3af?text=Photo'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-black uppercase rounded tracking-widest">{entry.badge}</span>
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded capitalize">{entry.category}</span>
              </div>
              <div className="p-4">
                <div className="font-bold text-gray-900">{entry.name}</div>
                <div className="text-xs text-gray-500">{entry.title} · {entry.joined}</div>
                <div className="flex mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={i < entry.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{entry.bio}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <button onClick={() => toggleActive(entry)} className={`text-[10px] font-bold px-2 py-1 rounded transition ${entry.isActive ? 'bg-emerald-50 text-emerald-600 hover:bg-red-50 hover:text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'}`}>
                    {entry.isActive ? '● Live' : '○ Hidden'}
                  </button>
                  <div className="flex space-x-1">
                    <button onClick={() => openEdit(entry)} className="p-1.5 bg-gray-50 hover:bg-orange-50 text-gray-500 hover:text-orange-500 rounded-lg transition"><Pencil size={13} /></button>
                    <button onClick={() => handleDelete(entry._id)} className="p-1.5 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-lg transition"><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white max-w-xl w-full rounded-2xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><X size={22} /></button>
            <h2 className="text-xl font-bold mb-6">{editing ? 'Edit Entry' : 'Add to Hall of Fame'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Name</label>
                  <input required className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Title / Role</label>
                  <input required className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Photo URL</label>
                <input required className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" placeholder="/events/person.jpg" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Bio</label>
                <textarea rows="3" required className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Badge Label</label>
                  <input required className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" placeholder="e.g. Verified, Gold, 500 trained" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Year / Period Joined</label>
                  <input required className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" placeholder="e.g. Jan 2022 or 2024" value={form.joined} onChange={(e) => setForm({ ...form, joined: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Category</label>
                  <select className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Rating (1–5)</label>
                  <input type="number" min="1" max="5" className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} />
                </div>
              </div>
              <label className="flex items-center space-x-2 cursor-pointer pt-1">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-orange-500" />
                <span className="text-sm font-medium text-gray-700">Show on website</span>
              </label>
              <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition">
                {editing ? 'Save Changes' : 'Add to Hall of Fame'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
