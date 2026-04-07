import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us — Tech4All',
  description: 'Reach out to the Tech4All team for inquiries, partnerships, or support.',
};

export default function ContactPage() {
  return (
    <div className="pb-20">
      <div className="bg-orange-600 pt-32 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-6">
           <h1 className="text-6xl font-black text-white tracking-tighter mb-4">
             Get <span className="opacity-50">in</span> Touch
           </h1>
           <p className="text-orange-100 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
             We’re here to help and answer any questions you might have. We look forward to hearing from you.
           </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto -mt-16 relative z-10 px-6">
         <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-2 overflow-hidden">
            <ContactForm />
         </div>
      </div>
    </div>
  );
}
