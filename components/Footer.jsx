export default function Footer(){
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold">Tech4All</h4>
          <p className="text-sm text-gray-600 mt-2">By LALA TECH — Free tech training for communities worldwide.</p>
        </div>
        <div>
          <h5 className="font-medium">Get involved</h5>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li><a>Request Training</a></li>
            <li><a>Volunteer</a></li>
            <li><a>Donate</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium">Contact</h5>
          <p className="text-sm text-gray-600 mt-2">hello@tech4all.org</p>
          <p className="text-sm text-gray-600">+234 800 000 0000</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} Tech4All — LALA TECH</div>
    </footer>
  );
}
