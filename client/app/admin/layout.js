'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  MessageSquare, 
  GraduationCap, 
  Image as ImageIcon, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Layers,
  Star,
  Users,
  Handshake
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Hero Carousel', icon: Layers, href: '/admin/hero' },
  { name: 'Programs / Courses', icon: GraduationCap, href: '/admin/courses' },
  { name: 'Hall of Fame', icon: Star, href: '/admin/hall-of-fame' },
  { name: 'Gallery', icon: ImageIcon, href: '/admin/gallery' },
  { name: 'Partners', icon: Handshake, href: '/admin/partners' },
  { name: 'Contacts', icon: MessageSquare, href: '/admin/contacts' },
  { name: 'Course Requests', icon: GraduationCap, href: '/admin/requests' },
  { name: 'Volunteers', icon: Users, href: '/admin/volunteers' },
  { name: 'Donations', icon: CreditCard, href: '/admin/donations' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Route protection
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && !pathname.includes('/admin/login')) {
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (pathname.includes('/admin/login')) {
    return <>{children}</>;
  }

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <Link href="/admin" className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Admin Panel
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                router.push('/admin/login');
              }}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600">
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4 ml-auto">
            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
