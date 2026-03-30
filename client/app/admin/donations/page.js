'use client';
import { useState, useEffect } from 'react';
import { 
  Search, 
  CreditCard, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Download,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ totalRaised: 0, totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const authHeader = { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` };
      
      const [donationsRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/donations', { headers: authHeader }),
        fetch('http://localhost:5000/api/donations/stats', { headers: authHeader })
      ]);
      
      const [donationsData, statsData] = await Promise.all([
        donationsRes.json(),
        statsRes.json()
      ]);
      
      setDonations(donationsData);
      setStats(statsData);
    } catch (err) {
      toast.error('Failed to fetch donation records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredDonations = donations.filter(d => 
    d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} className="text-emerald-500" />;
      case 'failed': return <XCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-orange-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donation Records</h1>
          <p className="text-gray-500 text-sm">Monitor Paystack transactions and donor history</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-md transition">
            <CreditCard size={16} />
            <span>Audit Ledger</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-emerald-50 opacity-10 group-hover:scale-150 transition-transform duration-700">
            <CreditCard size={120} />
          </div>
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-1">Total Raised</p>
          <h3 className="text-4xl font-black text-gray-900">₦{stats.totalRaised.toLocaleString()}</h3>
          <div className="mt-4 flex items-center space-x-2 text-emerald-600 text-xs font-bold">
             <div className="p-1 bg-emerald-100 rounded-full"><TrendingUp size={12} /></div>
             <span>+14.2% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Donations</p>
          <h3 className="text-4xl font-black text-gray-900">{stats.totalCount}</h3>
          <p className="text-gray-400 text-xs mt-4">Verified successful transactions</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Avg Donation</p>
          <h3 className="text-4xl font-black text-gray-900">₦{(stats.totalCount > 0 ? (stats.totalRaised / stats.totalCount).toFixed(0) : 0).toLocaleString()}</h3>
          <p className="text-gray-400 text-xs mt-4 italic">Per successful transfer</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">Transaction History</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search donor or reference..." 
                className="pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm w-full md:w-72"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
        </div>

        <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8fafc] text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Donor</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Reference</th>
                  <th className="px-8 py-5 text-center">Status</th>
                  <th className="px-8 py-5 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-20 text-slate-400 font-medium">Filtering transactions...</td></tr>
                ) : filteredDonations.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-20 text-slate-400">No donation records found</td></tr>
                ) : filteredDonations.map((d) => (
                  <tr key={d._id} className="hover:bg-slate-50/50 transition cursor-default">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                            {d.donorName.charAt(0)}
                         </div>
                         <div>
                            <div className="font-black text-slate-700 text-sm">{d.donorName}</div>
                            <div className="text-[11px] text-slate-400 font-medium">{d.email}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-800">₦{d.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">{d.channel || 'pending'}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-1.5 group">
                        <span className="text-xs font-mono text-slate-500">{d.reference}</span>
                        <ExternalLink size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition" />
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest leading-none ring-1 ${
                        d.status === 'success' ? 'bg-emerald-50 text-emerald-600 ring-emerald-100' : 
                        d.status === 'failed' ? 'bg-red-50 text-red-600 ring-red-100' : 'bg-orange-50 text-orange-600 ring-orange-100'
                      }`}>
                         {getStatusIcon(d.status)}
                         <span>{d.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="text-[11px] text-slate-600 font-bold">{new Date(d.createdAt).toLocaleDateString()}</div>
                       <div className="text-[10px] text-slate-400">{new Date(d.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendingUp(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
  )
}
