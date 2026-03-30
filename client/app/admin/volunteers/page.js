'use client';
import { useState, useEffect } from 'react';
import { Search, Trash2, CheckCircle, XCircle, Mail, Clock, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const token = () => localStorage.getItem('adminToken');

  const fetchVolunteers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/volunteers', {
        headers: { Authorization: `Bearer ${token()}` }
      });
      setVolunteers(await res.json());
    } catch { toast.error('Failed to load volunteers'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchVolunteers(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/volunteers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ status, isRead: true }),
      });
      toast.success(`Volunteer ${status}`);
      fetchVolunteers();
    } catch { toast.error('Update failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this volunteer application?')) return;
    try {
      await fetch(`http://localhost:5000/api/volunteers/${id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token()}` }
      });
      toast.success('Deleted'); fetchVolunteers();
    } catch { toast.error('Delete failed'); }
  };

  const filtered = volunteers.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
      case 'rejected': return 'bg-red-100 text-red-700 ring-1 ring-red-200';
      default: return 'bg-orange-100 text-orange-700 ring-1 ring-orange-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Applications</h1>
          <p className="text-gray-500 text-sm">Review and manage volunteer sign-ups</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-9 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-sm w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading ? (
          <p className="col-span-full text-center py-20 text-gray-400">Loading applications...</p>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-24 text-center border-2 border-dashed rounded-3xl bg-gray-50">
            <Star size={40} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">No volunteer applications yet</p>
          </div>
        ) : filtered.map(v => (
          <div key={v._id} className={`bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition ${!v.isRead ? 'border-orange-200 ring-1 ring-orange-100' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow">
                  {v.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{v.name}</div>
                  <div className="text-xs text-gray-400 flex items-center space-x-1">
                    <Mail size={10} /><span>{v.email}</span>
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${getStatusStyle(v.status)}`}>
                {v.status}
              </span>
            </div>

            {v.skills && (
              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-tighter mb-1">Skills / Offer</p>
                <p className="text-sm text-gray-700 italic">"{v.skills}"</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
              <div className="flex items-center space-x-1 text-[10px] text-gray-400">
                <Clock size={10} /><span>{new Date(v.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => updateStatus(v._id, 'approved')} disabled={v.status === 'approved'} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition disabled:opacity-30" title="Approve">
                  <CheckCircle size={17} />
                </button>
                <button onClick={() => updateStatus(v._id, 'rejected')} disabled={v.status === 'rejected'} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-30" title="Reject">
                  <XCircle size={17} />
                </button>
                <button onClick={() => handleDelete(v._id)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition" title="Delete">
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
