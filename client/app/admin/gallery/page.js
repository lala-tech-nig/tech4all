'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Link as LinkIcon,
  X,
  Upload,
  Calendar,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    url: '',
    caption: '',
    category: 'training'
  });

  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery`);
      const data = await response.json();
      setImages(data);
    } catch (err) {
      toast.error('Failed to fetch gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/gallery`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
        },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        toast.success('Image added to gallery');
        setIsModalOpen(false);
        setForm({ url: '', caption: '', category: 'training' });
        fetchImages();
      }
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await fetch(`${API_BASE_URL}/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      toast.success('Deleted');
      fetchImages();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500 text-sm">Control the photos displayed on the homepage</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-orange-600 transition shadow-lg shadow-orange-500/20"
        >
          <Plus size={20} />
          <span>Add Photo</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500">Loading gallery images...</div>
      ) : images.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium italic">"A gallery without pictures is like a mind without memories..."</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-4 text-orange-500 font-bold hover:underline"
          >
            Start uploading now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div key={image._id} className="relative group bg-white rounded-2xl overflow-hidden shadow-sm aspect-square border border-gray-100">
               <img 
                src={image.url} 
                alt={image.caption} 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <p className="text-white text-xs font-medium line-clamp-2 mb-3">{image.caption}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] text-white uppercase tracking-wider font-bold">
                      {image.category}
                    </span>
                    <button 
                      onClick={() => handleDelete(image._id)}
                      className="p-1.5 bg-red-600 rounded-lg text-white hover:bg-red-500 transition shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 border border-gray-100 relative slide-in-from-bottom-5">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Upload className="text-orange-500" />
              <span>Add to Gallery</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    required
                    className="w-full border rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition text-sm"
                    value={form.url}
                    onChange={(e) => setForm({...form, url: e.target.value})}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <input 
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition text-sm"
                  value={form.caption}
                  onChange={(e) => setForm({...form, caption: e.target.value})}
                  placeholder="e.g. Training session at LALA TECH Hub"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition text-sm appearance-none bg-white"
                  value={form.category}
                  onChange={(e) => setForm({...form, category: e.target.value})}
                >
                  <option value="training">Training</option>
                  <option value="outreach">Outreach</option>
                  <option value="graduation">Graduation</option>
                  <option value="event">Event</option>
                </select>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 active:scale-[0.98]">
                  Confirm & Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
