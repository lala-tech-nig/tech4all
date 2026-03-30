'use client';
import { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  CheckCircle, 
  RotateCcw, 
  Mail, 
  Phone,
  Filter,
  MoreVertical
} from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/utils/api';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    try {
      await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      toast.success('Deleted successfully');
      fetchContacts();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/contacts/${id}/read`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchContacts();
    } catch (err) {
      toast.error('Failed to mark as read');
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-500 text-sm">Manage messages from the contact form</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
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
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-500">Loading contacts...</td></tr>
              ) : filteredContacts.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-500">No submissions found</td></tr>
              ) : filteredContacts.map((contact) => (
                <tr key={contact._id} className={`hover:bg-gray-50 transition ${!contact.isRead ? 'bg-orange-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{contact.name}</div>
                    <div className="text-xs text-gray-500 flex items-center space-x-2 mt-1">
                      <Mail size={12} /> <span>{contact.email}</span>
                    </div>
                    {contact.phone && (
                      <div className="text-xs text-gray-500 flex items-center space-x-2 mt-0.5">
                        <Phone size={12} /> <span>{contact.phone}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 min-w-[300px]">
                    <p className="text-sm text-gray-700 line-clamp-2 italic">"{contact.message}"</p>
                    <span className="text-[10px] text-gray-400 mt-2 block">{new Date(contact.createdAt).toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {contact.isRead ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Read</span>
                    ) : (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold ring-1 ring-orange-200">New</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {!contact.isRead && (
                        <button 
                          onClick={() => markAsRead(contact._id)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition" 
                          title="Mark as Read"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(contact._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
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
