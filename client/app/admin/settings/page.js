'use client';
import { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Globe, 
  ShieldCheck, 
  Bell,
  Save,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Plus,
  Trash2,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/utils/api';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Account Form
  const [accountForm, setAccountForm] = useState({
    name: 'Tech4All Admin',
    email: 'admin@tech4all.com',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Site Settings Form
  const [siteForm, setSiteForm] = useState({
    contact: { address: '', phone: '', email: '' },
    socials: { facebook: '', twitter: '', instagram: '', youtube: '' },
    about: { footer_text: '', mission_statement: '' },
    volunteerRoles: []
  });

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`);
      const data = await res.json();
      setSiteForm(data);
    } catch (err) {
      toast.error('Failed to load site settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast.success('Profile updated (simulation)');
  };

  const handleUpdateSite = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(siteForm)
      });
      if (res.ok) {
        toast.success('Site settings updated successfully');
        fetchSettings();
      }
    } catch (err) {
      toast.error('Failed to save settings');
    }
  };

  const addRole = () => {
    setSiteForm({
      ...siteForm,
      volunteerRoles: [...siteForm.volunteerRoles, { title: '', desc: '' }]
    });
  };

  const removeRole = (index) => {
    const newRoles = [...siteForm.volunteerRoles];
    newRoles.splice(index, 1);
    setSiteForm({ ...siteForm, volunteerRoles: newRoles });
  };

  const updateRole = (index, field, value) => {
    const newRoles = [...siteForm.volunteerRoles];
    newRoles[index][field] = value;
    setSiteForm({ ...siteForm, volunteerRoles: newRoles });
  };

  if (loading) return <div className="py-20 text-center text-gray-500">Loading settings...</div>;

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account and global website information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Navigation */}
        <div className="lg:col-span-1 space-y-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition shadow-sm ${activeTab === 'profile' ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'}`}
            >
               <User size={18} />
               <span>Admin Profile</span>
            </button>
            <button 
              onClick={() => setActiveTab('site')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition shadow-sm ${activeTab === 'site' ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'}`}
            >
               <Globe size={18} />
               <span>Site Configuration</span>
            </button>
            <button 
              onClick={() => setActiveTab('roles')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition shadow-sm ${activeTab === 'roles' ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'}`}
            >
               <Info size={18} />
               <span>Volunteer Roles</span>
            </button>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-3 space-y-6">
           
           {/* Profile & Security Tab */}
           {activeTab === 'profile' && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                  <div className="flex items-center space-x-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                    <User size={14} />
                    <span>Account credentials</span>
                  </div>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-tighter mb-2">Display Name</label>
                          <input 
                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition"
                            value={accountForm.name}
                            onChange={(e) => setAccountForm({...accountForm, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-tighter mb-2">Email Address</label>
                          <input 
                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition"
                            value={accountForm.email}
                            onChange={(e) => setAccountForm({...accountForm, email: e.target.value})}
                          />
                        </div>
                     </div>
                     <button type="submit" className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:opacity-90 transition">
                        <Save size={16} />
                        <span>Update Identity</span>
                     </button>
                  </form>
               </div>

               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                  <div className="flex items-center space-x-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                    <Lock size={14} />
                    <span>Change Password</span>
                  </div>
                  <form className="space-y-4">
                     <input type="password" placeholder="Current Password" className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition" />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <input type="password" placeholder="New Password" className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition" />
                         <input type="password" placeholder="Confirm New" className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition" />
                     </div>
                     <button className="px-6 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold hover:bg-gray-50 transition">
                        Update Security
                     </button>
                  </form>
               </div>
             </div>
           )}

           {/* Site Configuration Tab */}
           {activeTab === 'site' && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
               <form onSubmit={handleUpdateSite} className="space-y-6">
                  {/* Contact Info */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center space-x-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                      <Phone size={14} />
                      <span>Contact Information</span>
                    </div>
                    <div className="space-y-4">
                       <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-tighter mb-2">Physical Address</label>
                         <div className="relative">
                            <MapPin className="absolute left-4 top-3.5 text-gray-400" size={16} />
                            <input 
                              className="w-full border border-gray-100 bg-gray-50/50 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition"
                              value={siteForm.contact.address}
                              onChange={(e) => setSiteForm({...siteForm, contact: {...siteForm.contact, address: e.target.value}})}
                            />
                         </div>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-tighter mb-2">Phone Number</label>
                            <div className="relative">
                               <Phone className="absolute left-4 top-3.5 text-gray-400" size={16} />
                               <input 
                                 className="w-full border border-gray-100 bg-gray-50/50 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition"
                                 value={siteForm.contact.phone}
                                 onChange={(e) => setSiteForm({...siteForm, contact: {...siteForm.contact, phone: e.target.value}})}
                               />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-tighter mb-2">Public Email</label>
                            <div className="relative">
                               <Mail className="absolute left-4 top-3.5 text-gray-400" size={16} />
                               <input 
                                 className="w-full border border-gray-100 bg-gray-50/50 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition"
                                 value={siteForm.contact.email}
                                 onChange={(e) => setSiteForm({...siteForm, contact: {...siteForm.contact, email: e.target.value}})}
                               />
                            </div>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center space-x-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                      <Globe size={14} />
                      <span>Social Media Links</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="relative">
                          <Facebook className="absolute left-4 top-3.5 text-gray-400" size={16} />
                          <input 
                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition"
                            placeholder="Facebook URL"
                            value={siteForm.socials.facebook}
                            onChange={(e) => setSiteForm({...siteForm, socials: {...siteForm.socials, facebook: e.target.value}})}
                          />
                       </div>
                       <div className="relative">
                          <Twitter className="absolute left-4 top-3.5 text-gray-400" size={16} />
                          <input 
                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition"
                            placeholder="Twitter URL"
                            value={siteForm.socials.twitter}
                            onChange={(e) => setSiteForm({...siteForm, socials: {...siteForm.socials, twitter: e.target.value}})}
                          />
                       </div>
                       <div className="relative">
                          <Instagram className="absolute left-4 top-3.5 text-gray-400" size={16} />
                          <input 
                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition"
                            placeholder="Instagram URL"
                            value={siteForm.socials.instagram}
                            onChange={(e) => setSiteForm({...siteForm, socials: {...siteForm.socials, instagram: e.target.value}})}
                          />
                       </div>
                       <div className="relative">
                          <Youtube className="absolute left-4 top-3.5 text-gray-400" size={16} />
                          <input 
                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition"
                            placeholder="Youtube URL"
                            value={siteForm.socials.youtube}
                            onChange={(e) => setSiteForm({...siteForm, socials: {...siteForm.socials, youtube: e.target.value}})}
                          />
                       </div>
                    </div>
                  </div>

                  {/* Footer Text */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center space-x-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                      <Save size={14} />
                      <span>Footer About Blurb</span>
                    </div>
                    <textarea 
                      rows="3"
                      className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 transition"
                      value={siteForm.about.footer_text}
                      onChange={(e) => setSiteForm({...siteForm, about: {...siteForm.about, footer_text: e.target.value}})}
                    />
                  </div>

                  <button type="submit" className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 active:scale-[0.99]">
                    Publish Changes to Live Website
                  </button>
               </form>
             </div>
           )}

           {/* Volunteer Roles Tab */}
           {activeTab === 'roles' && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                      <Info size={14} />
                      <span>Manage Volunteer Roles</span>
                    </div>
                    <button 
                      onClick={addRole}
                      className="flex items-center space-x-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-100 transition"
                    >
                      <Plus size={14} />
                      <span>Add Role</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {siteForm.volunteerRoles.map((role, idx) => (
                      <div key={idx} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 relative group">
                        <button 
                          onClick={() => removeRole(idx)}
                          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 gap-4">
                           <input 
                             placeholder="Role Title (e.g. 🎤 Facilitators)"
                             className="bg-transparent border-b border-gray-200 py-1 font-bold text-gray-800 outline-none focus:border-orange-500 transition"
                             value={role.title}
                             onChange={(e) => updateRole(idx, 'title', e.target.value)}
                           />
                           <textarea 
                             rows="2"
                             placeholder="Role Description..."
                             className="bg-transparent text-sm text-gray-600 outline-none resize-none"
                             value={role.desc}
                             onChange={(e) => updateRole(idx, 'desc', e.target.value)}
                           />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleUpdateSite}
                    className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition"
                  >
                    Save Volunteer Roles
                  </button>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
