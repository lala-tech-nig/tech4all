'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';
import { Plus, Pencil, Trash2, X, ExternalLink, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';

const EMPTY_FORM = { name: '', logoUrl: '', website: '', order: 0, isActive: true };

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const token = () => localStorage.getItem('adminToken');

  const fetchPartners = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/partners?admin=true`);
      setPartners(await res.json());
    } catch { toast.error('Failed to load partners'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPartners(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setIsModalOpen(true); };
  const openEdit = (partner) => { setEditing(partner); setForm(partner); setIsModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editing
      ? `${API_BASE_URL}/partners/${editing._id}`
      : `${API_BASE_URL}/partners`;
    const method = editing ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify(form),
      });
      if (res.ok) { toast.success(editing ? 'Partner updated' : 'Partner added'); setIsModalOpen(false); fetchPartners(); }
    } catch { toast.error('Server error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this partner?')) return;
    try {
      await fetch(`${API_BASE_URL}/partners/${id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token()}` }
      });
      toast.success('Removed'); fetchPartners();
    } catch { toast.error('Delete failed'); }
  };

  const toggleActive = async (partner) => {
    try {
      await fetch(`${API_BASE_URL}/partners/${partner._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ ...partner, isActive: !partner.isActive }),
      });
      fetchPartners();
    } catch { toast.error('Toggle failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners Carousel</h1>
          <p className="text-gray-500 text-sm">Manage the partner logos displayed on the homepage</p>
        </div>
        <button onClick={openCreate} className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">
          <Plus size={18} /><span>Add Partner</span>
        </button>
      </div>

      {loading ? <p className="py-20 text-center text-gray-400">Loading partners...</p> : partners.length === 0 ? (
        <div className="py-24 text-center border-2 border-dashed rounded-3xl bg-gray-50">
          <p className="text-gray-400 font-medium">No partners added yet. Start adding partner logos.</p>
          <button onClick={openCreate} className="mt-4 text-orange-500 font-bold hover:underline">Add first partner →</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {partners.map(partner => (
            <div key={partner._id} className={`bg-white rounded-2xl border shadow-sm p-4 flex flex-col items-center group hover:shadow-md transition ${!partner.isActive ? 'opacity-50 grayscale' : ''}`}>
              <div className="h-16 w-full flex items-center justify-center mb-3">
                <img src={partner.logoUrl} alt={partner.name} className="max-h-12 max-w-full object-contain" onError={(e) => { e.target.src = 'https://placehold.co/200x80/f3f4f6/9ca3af?text=Logo'; }} />
              </div>
              <div className="text-center mb-3">
                <p className="font-semibold text-sm text-gray-800">{partner.name}</p>
                {partner.website && (
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-[10px] text-orange-500 hover:underline flex items-center justify-center space-x-0.5 mt-0.5">
                    <span>Visit</span><ExternalLink size={9} />
                  </a>
                )}
              </div>
              <div className="flex items-center justify-between w-full pt-3 border-t border-gray-50 gap-2">
                <button onClick={() => toggleActive(partner)} className={`text-[10px] font-bold px-2 py-1 rounded transition flex-1 ${partner.isActive ? 'bg-emerald-50 text-emerald-600 hover:bg-red-50 hover:text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'}`}>
                  {partner.isActive ? '● Live' : '○ Off'}
                </button>
                <button onClick={() => openEdit(partner)} className="p-1.5 bg-gray-50 hover:bg-orange-50 text-gray-500 hover:text-orange-500 rounded-lg transition"><Pencil size={13} /></button>
                <button onClick={() => handleDelete(partner._id)} className="p-1.5 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-lg transition"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><X size={22} /></button>
            <h2 className="text-xl font-bold mb-6">{editing ? 'Edit Partner' : 'Add New Partner'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Partner / Organization Name</label>
                <input required className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Logo URL</label>
                <input required className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" placeholder="/partners/logo.png or https://..." value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Website (optional)</label>
                <input type="url" className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" placeholder="https://partnersite.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Display Order</label>
                  <input type="number" className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })} />
                </div>
                <div className="flex flex-col justify-end pb-2.5">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-orange-500" />
                    <span className="text-sm font-medium text-gray-700">Show on site</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition mt-2">
                {editing ? 'Save Changes' : 'Add Partner'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
