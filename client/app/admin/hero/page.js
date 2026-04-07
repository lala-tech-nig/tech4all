'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';
import { Plus, Pencil, Trash2, Image as ImageIcon, X, ToggleLeft, ToggleRight, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';

const EMPTY_FORM = { src: '', title: '', subtitle: '', order: 0, isActive: true };

export default function AdminHero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const token = () => localStorage.getItem('adminToken');

  const fetchSlides = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/hero-slides?admin=true`);
      setSlides(await res.json());
    } catch { toast.error('Failed to load slides'); }
    finally { setLoading(false); }
  };

  useEffect(() => { 
    fetchSlides();
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const openCreate = () => { 
    setEditing(null); 
    setForm(EMPTY_FORM); 
    setIsModalOpen(true); 
    setFile(null);
    setPreviewUrl(null);
  };
  const openEdit = (slide) => { 
    setEditing(slide); 
    setForm(slide); 
    setIsModalOpen(true); 
    setFile(null);
    setPreviewUrl(null);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const url = editing
      ? `${API_BASE_URL}/hero-slides/${editing._id}`
      : `${API_BASE_URL}/hero-slides`;
    const method = editing ? 'PUT' : 'POST';
    
    if (!editing && !file) {
      setSubmitting(false);
      return toast.error('Please select an image file');
    }

    const formData = new FormData();
    if (file) formData.append('image', file);
    formData.append('title', form.title);
    formData.append('subtitle', form.subtitle);
    formData.append('order', form.order);
    formData.append('isActive', form.isActive);

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token()}` },
        body: formData,
      });
      if (res.ok) {
        toast.success(editing ? 'Slide updated' : 'Slide created');
        setIsModalOpen(false);
        setFile(null);
        setPreviewUrl(null);
        fetchSlides();
      } else if (res.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      } else {
        toast.error('Save failed');
      }
    } catch {
      toast.error('Server error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this slide?')) return;
    try {
      await fetch(`${API_BASE_URL}/hero-slides/${id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token()}` }
      });
      toast.success('Deleted'); fetchSlides();
    } catch { toast.error('Delete failed'); }
  };

  const toggleActive = async (slide) => {
    try {
      await fetch(`${API_BASE_URL}/hero-slides/${slide._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ ...slide, isActive: !slide.isActive }),
      });
      fetchSlides();
    } catch { toast.error('Toggle failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Carousel Slides</h1>
          <p className="text-gray-500 text-sm">Control what visitors see on the homepage banner</p>
        </div>
        <button onClick={openCreate} className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">
          <Plus size={18} /><span>Add Slide</span>
        </button>
      </div>

      {loading ? (
        <p className="text-center py-20 text-gray-400">Loading slides...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div key={slide._id} className={`relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg group border-2 ${slide.isActive ? 'border-emerald-400' : 'border-gray-700 opacity-60'}`}>
              <div className="relative h-44 w-full">
                <img src={slide.src} alt={slide.title} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://placehold.co/600x400/1a1a2e/orange?text=Slide'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{slide.title}</h3>
                  <p className="text-white/70 text-xs line-clamp-1 mt-0.5">{slide.subtitle}</p>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-black/60 text-white">
                    Order #{slide.order}
                  </span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between bg-gray-800">
                <button onClick={() => toggleActive(slide)} className={`flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition ${slide.isActive ? 'bg-emerald-500/20 text-emerald-400 hover:bg-red-500/20 hover:text-red-400' : 'bg-gray-700 text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400'}`}>
                  {slide.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  <span>{slide.isActive ? 'Live' : 'Hidden'}</span>
                </button>
                <div className="flex space-x-2">
                  <button onClick={() => openEdit(slide)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(slide._id)} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-400 transition"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-8 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><X size={22} /></button>
            <h2 className="text-xl font-bold mb-6">{editing ? 'Edit Slide' : 'New Hero Slide'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Banner Image {editing && '(leave empty to keep current)'}</label>
                
                {previewUrl ? (
                  <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden border-2 border-orange-500/30 group">
                    <img src={previewUrl} className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => { setFile(null); setPreviewUrl(null); }}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : editing?.src ? (
                   <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden border border-gray-200">
                    <img src={editing.src} className="w-full h-full object-cover opacity-50 grayscale-[50%]" />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-50/50">Current Image</div>
                  </div>
                ) : null}

                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    required={!editing}
                    type="file"
                    accept="image/*"
                    className="w-full border rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition text-sm file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    onChange={handleFileChange} 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" placeholder="e.g. Tech4All by LALA TECH" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input required className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" placeholder="e.g. Join the global mission..." value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input type="number" className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 text-sm" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })} />
                </div>
                <div className="flex flex-col justify-end pb-2.5">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-orange-500" />
                    <span className="text-sm font-medium text-gray-700">Publish (show on site)</span>
                  </label>
                </div>
              </div>
                <button 
                  disabled={submitting}
                  type="submit" 
                  className={`w-full font-bold py-3 rounded-lg transition flex items-center justify-center space-x-2 mt-2 shadow-lg ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20 active:scale-[0.98]'}`}
                >
                  {submitting && (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  <span>{submitting ? 'Processing...' : (editing ? 'Save Changes' : 'Publish Slide')}</span>
                </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
