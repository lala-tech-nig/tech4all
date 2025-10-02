import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Tech4All logo" width={120} height={48} />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <a href="#programs" className="hover:text-orange-500 transition">Programs</a>
          <a href="#hall" className="hover:text-orange-500 transition">Hall of Fame</a>
          <a href="#gallery" className="hover:text-orange-500 transition">Gallery</a>
          <a href="#partners" className="hover:text-orange-500 transition">Partners</a>
          <a href="#contact" className="hover:text-orange-500 transition">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="px-3 py-2 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600">Request Training</a>
          <a href="#contact" className="px-3 py-2 border border-orange-500 text-orange-500 rounded-md hidden md:inline-block">Volunteer</a>
        </div>
      </div>
    </header>
  );
}
