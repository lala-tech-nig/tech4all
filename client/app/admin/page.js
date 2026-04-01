'use client';
import { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  GraduationCap, 
  CreditCard,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Image as ImageIcon
} from 'lucide-react';

import { API_BASE_URL } from '@/utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [recentData, setRecentData] = useState({ contacts: [], requests: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const statsRes = await fetch(`${API_BASE_URL}/dashboard/stats`, { headers });
      const statsJson = await statsRes.json();
      
      const recentRes = await fetch(`${API_BASE_URL}/dashboard/recent`, { headers });
      const recentJson = await recentRes.json();

      if (statsJson.totalContacts !== undefined) {
        const formattedStats = [
          { name: 'Total Contacts', value: statsJson.totalContacts, icon: MessageSquare, change: '+12%', color: 'from-blue-500 to-blue-600' },
          { name: 'Course Requests', value: statsJson.courseRequests, icon: GraduationCap, change: '+18.5%', color: 'from-orange-500 to-orange-600' },
          { name: 'Active Programs', value: statsJson.activePrograms, icon: Users, change: '0%', color: 'from-purple-500 to-purple-600' },
          { name: 'Total Donations', value: statsJson.totalDonations, icon: CreditCard, change: '+24%', color: 'from-emerald-500 to-emerald-600' },
        ];
        setStats(formattedStats);
      }
      
      if (recentJson.contacts && recentJson.requests) {
        setRecentData(recentJson);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Real-time statistics for Tech4All</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            Export Report
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center space-x-1 text-emerald-500 text-sm font-medium">
                <span>{stat.change}</span>
                <TrendingUp size={14} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">{stat.name}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Submissions</h3>
            <button className="text-orange-500 text-sm font-semibold hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {(recentData?.contacts || []).concat(recentData?.requests || []).slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition group">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${item.subject ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500">
                      {item.subject ? `Messaged: "${item.subject}"` : `Requested: ${item.courseId?.title || 'Course'}`} • {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                  <button className="text-xs font-bold text-orange-500 px-3 py-1 bg-orange-50 rounded-lg">View</button>
                  <button className="text-xs font-bold text-gray-500 px-3 py-1 bg-gray-50 rounded-lg">Dismiss</button>
                </div>
              </div>
            ))}
            {recentData.contacts.length === 0 && recentData.requests.length === 0 && (
              <p className="text-center py-10 text-gray-400 italic">No recent activity found.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center space-x-3 p-3 rounded-xl border border-dashed border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition w-full group text-left">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition">
                <GraduationCap size={20} />
              </div>
              <span className="font-medium text-gray-700">Add New Course</span>
            </button>
            <button className="flex items-center space-x-3 p-3 rounded-xl border border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition w-full group text-left">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition">
                <ImageIcon size={20} />
              </div>
              <span className="font-medium text-gray-700">Upload Photos</span>
            </button>
            <button className="flex items-center space-x-3 p-3 rounded-xl border border-dashed border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition w-full group text-left">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition">
                <CreditCard size={20} />
              </div>
              <span className="font-medium text-gray-700">Audit Donations</span>
            </button>
          </div>

          <div className="mt-8 p-4 bg-orange-600 rounded-2xl text-white">
            <div className="flex items-center justify-between mb-4">
              <Clock size={24} className="opacity-75" />
              <ArrowUpRight size={20} className="opacity-75" />
            </div>
            <h4 className="font-bold text-lg">Daily Goal</h4>
            <p className="text-white/70 text-sm mt-1">We reached 85% of our monthly growth target!</p>
            <div className="mt-4 bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full w-[85%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
