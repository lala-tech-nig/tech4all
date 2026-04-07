'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Video, 
  Layout, 
  Check, 
  X,
  GripVertical
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
    icon: '',
    isActive: true,
    order: 0
  });

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses?admin=true`);
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

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
    const url = editingCourse 
      ? `${API_BASE_URL}/courses/${editingCourse._id}` 
      : `${API_BASE_URL}/courses`;
    const method = editingCourse ? 'PUT' : 'POST';

    const formData = new FormData();
    if (file) formData.append('image', file);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('videoUrl', form.videoUrl);
    formData.append('icon', form.icon);
    formData.append('order', form.order);
    formData.append('isActive', form.isActive);

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
        },
        body: formData
      });
      
      if (response.ok) {
        toast.success(editingCourse ? 'Course updated' : 'Course created');
        setIsModalOpen(false);
        setEditingCourse(null);
        setFile(null);
        setPreviewUrl(null);
        setForm({ title: '', description: '', videoUrl: '', icon: '', isActive: true, order: 0 });
        fetchCourses();
      } else if (response.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      } else {
        toast.error('Save failed');
      }
    } catch (err) {
      toast.error('Server error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setForm(course);
    setFile(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      toast.success('Deleted');
      fetchCourses();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
          <p className="text-gray-500 text-sm">Create and edit training programs</p>
        </div>
        <button 
          onClick={() => {
            setEditingCourse(null);
            setFile(null);
            setPreviewUrl(null);
            setForm({ title: '', description: '', videoUrl: '', icon: '', isActive: true, order: 0 });
            setIsModalOpen(true);
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-orange-600 transition shadow-lg shadow-orange-500/20"
        >
          <Plus size={20} />
          <span>Add Program</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-full py-10 text-center text-gray-500">Loading courses...</p>
        ) : courses.map((course) => (
          <div key={course._id} className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col ${!course.isActive ? 'opacity-60 grayscale' : ''}`}>
             <div className="h-40 bg-gray-900 relative group">
                <img 
                  src={course.imageUrl || `https://placehold.co/600x400/1a1a2e/orange?text=${course.title.split(' ')[0]}`} 
                  className="w-full h-full object-cover opacity-60" 
                  alt={course.title}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                  <Video className="text-white/50" size={48} />
                </div>
                <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition">
                   <button onClick={() => handleEdit(course)} className="p-2 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition shadow-lg">
                      <Pencil size={16} />
                   </button>
                   <button onClick={() => handleDelete(course._id)} className="p-2 bg-red-500/90 rounded-lg text-white hover:bg-red-500 transition shadow-lg">
                      <Trash2 size={16} />
                   </button>
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 rounded text-[10px] uppercase font-bold text-white tracking-widest">
                  Order: #{course.order}
                </div>
             </div>
             <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{course.title}</h3>
                  {course.isActive ? (
                    <span className="p-1 bg-emerald-100 text-emerald-600 rounded-full"><Check size={14} title="Active" /></span>
                  ) : (
                    <span className="p-1 bg-gray-100 text-gray-600 rounded-full"><X size={14} title="Inactive" /></span>
                  )}
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 italic mb-4">"{course.description}"</p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                   <span className="flex items-center space-x-1 uppercase tracking-tighter font-bold">
                    <Layout size={12} /> <span>{course.isActive ? 'Pubished' : 'Hidden'}</span>
                   </span>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Course Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-8 border border-gray-100 relative slide-in-from-bottom-5">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6">{editingCourse ? 'Update Program' : 'Create New Program'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Course Image</label>
                
                {previewUrl ? (
                  <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden border border-orange-500/30 group bg-gray-50">
                    <img src={previewUrl} className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => { setFile(null); setPreviewUrl(null); }}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : editingCourse?.imageUrl ? (
                  <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center opacity-70 group">
                    <img src={editingCourse.imageUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition">Current Image</div>
                  </div>
                ) : null}

                <input 
                  type="file" 
                  accept="image/*"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition text-sm file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  required
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition"
                  value={form.title}
                  onChange={(e) => setForm({...form, title: e.target.value})}
                  placeholder="e.g. Website Development"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  rows="3"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (link to .mp4)</label>
                  <input 
                    className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition text-sm"
                    value={form.videoUrl}
                    onChange={(e) => setForm({...form, videoUrl: e.target.value})}
                    placeholder="/programs/demo.mp4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input 
                    type="number"
                    className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition"
                    value={form.order}
                    onChange={(e) => setForm({...form, order: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({...form, isActive: e.target.checked})}
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Program is Active & Visible</label>
              </div>

              <div className="pt-6">
                <button 
                  disabled={submitting}
                  type="submit" 
                  className={`w-full font-bold py-3 rounded-lg transition flex items-center justify-center space-x-2 ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20'}`}
                >
                  {submitting && (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  <span>{submitting ? 'Processing...' : (editingCourse ? 'Save Changes' : 'Publish Program')}</span>
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
