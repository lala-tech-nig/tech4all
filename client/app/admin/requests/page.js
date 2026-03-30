'use client';
import { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter,
  MoreVertical,
  Mail,
  GraduationCap
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/requests', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
        },
        body: JSON.stringify({ status })
      });
      toast.success(`Request ${status}`);
      fetchRequests();
    } catch (err) {
      toast.error('Status update failed');
    }
  };

  const filteredRequests = requests.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.programName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
      case 'rejected': return 'bg-red-100 text-red-700 ring-red-200';
      default: return 'bg-orange-100 text-orange-700 ring-orange-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Program Requests</h1>
          <p className="text-gray-500 text-sm">Applications for training courses</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or program..." 
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border rounded-lg hover:bg-gray-50 text-gray-600">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4 text-center">Program</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-500">Loading requests...</td></tr>
              ) : filteredRequests.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-500">No requests found</td></tr>
              ) : filteredRequests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{req.name}</div>
                    <div className="text-xs text-gray-500 flex items-center space-x-2 mt-1">
                      <Mail size={12} /> <span>{req.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-lg text-sm font-medium border text-gray-600">
                      <GraduationCap size={16} />
                      <span>{req.programName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ring-1 ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button 
                        onClick={() => updateStatus(req._id, 'approved')}
                        disabled={req.status === 'approved'}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition disabled:opacity-30" 
                        title="Approve"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        onClick={() => updateStatus(req._id, 'rejected')}
                        disabled={req.status === 'rejected'}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-30"
                        title="Reject"
                      >
                        <XCircle size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
