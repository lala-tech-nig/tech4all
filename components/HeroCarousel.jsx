// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import Confetti from "react-confetti";

// const SLIDES = [
//   { src: "/hero1.jpg", title: "Empowering the Next Tech Generation", subtitle: "Request free training for your community, school, or group today." },
//   { src: "/hero2.jpg", title: "Hands-on Phone & Laptop Repair", subtitle: "Practical device repair skills to create sustainable income." },
//   { src: "/hero3.jpg", title: "Digital Skills for Market Women", subtitle: "Helping women embrace payments, inventory, and online sales." },
//   { src: "/hero4.jpg", title: "Website Development & Content Creation", subtitle: "Equipping youths with modern tech skills to thrive globally." },
//   { src: "/hero5.jpg", title: "Join Us As a Volunteer or Donor", subtitle: "Together, we can eradicate computer illiteracy worldwide." },
// ];

// export default function HeroCarousel() {
//   const [index, setIndex] = useState(0);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [modal, setModal] = useState(null); // "training" | "volunteer" | "donate"

//   useEffect(() => {
//     const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
//     return () => clearInterval(t);
//   }, []);

//   const handleSubmit = (type, name) => {
//     toast.success(`${name}, thank you for registering! Our team will get back to you.`);
//     setShowConfetti(true);
//     setTimeout(() => setShowConfetti(false), 5000);
//     setModal(null);
//   };

//   const handleDonate = (amount) => {
//     window.location.href = `https://flutterwave.com/pay/your-donation-link?amount=${amount}`;
//   };

//   return (
//     <section className="relative h-[90vh] w-screen overflow-hidden">
//       {/* Slides */}
//       {SLIDES.map((s, i) => (
//         <AnimatePresence key={i}>
//           {i === index && (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 1 }}
//               className="absolute inset-0 z-10"
//             >
//               <Image src={s.src} alt={s.title} fill className="object-cover" />
//               <div className="absolute inset-0 bg-black/50 flex items-center">
//                 <div className="max-w-5xl mx-auto px-6 text-center text-white">
//                   <motion.h2
//                     initial={{ y: 30, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
//                   >
//                     {s.title}
//                   </motion.h2>
//                   <motion.p
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.6 }}
//                     className="mt-4 text-lg md:text-2xl drop-shadow"
//                   >
//                     {s.subtitle}
//                   </motion.p>
//                   <motion.div
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.9 }}
//                     className="mt-8 flex flex-wrap justify-center gap-4"
//                   >
//                     <button
//                       onClick={() => setModal("training")}
//                       className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition"
//                     >
//                       Request Training
//                     </button>
//                     <button
//                       onClick={() => setModal("volunteer")}
//                       className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition"
//                     >
//                       Volunteer
//                     </button>
//                     <button
//                       onClick={() => setModal("donate")}
//                       className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition"
//                     >
//                       Donate
//                     </button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       ))}

//       {/* Indicators */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
//         {SLIDES.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setIndex(i)}
//             className={`w-4 h-4 rounded-full transition ${
//               i === index ? "bg-orange-500 scale-110" : "bg-white/50 hover:bg-orange-400"
//             }`}
//           ></button>
//         ))}
//       </div>

//       {/* Confetti */}
//       {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

//       {/* Modals */}
//       {modal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative animate-fadeIn">
//             <button onClick={() => setModal(null)} className="absolute top-3 right-3 text-gray-500">✖</button>

//             {modal === "training" && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-4 text-orange-600">Request Training</h2>
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSubmit("training", e.target.name.value);
//                   }}
//                   className="space-y-4"
//                 >
//                   <select name="persona" required className="w-full border p-3 rounded-lg">
//                     <option value="">Who are you?</option>
//                     <option>Individual</option>
//                     <option>Organization</option>
//                     <option>Community</option>
//                   </select>
//                   <input type="text" name="name" placeholder="Name / Organization / Community" required className="w-full border p-3 rounded-lg" />
//                   <textarea name="details" placeholder="Tell us why you need this training" className="w-full border p-3 rounded-lg"></textarea>
//                   <button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-lg text-white font-semibold">Submit</button>
//                 </form>
//               </div>
//             )}

//             {modal === "volunteer" && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-4 text-orange-600">Volunteer With Us</h2>
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSubmit("volunteer", e.target.name.value);
//                   }}
//                   className="space-y-4"
//                 >
//                   <input type="text" name="name" placeholder="Your Full Name" required className="w-full border p-3 rounded-lg" />
//                   <input type="email" name="email" placeholder="Your Email" required className="w-full border p-3 rounded-lg" />
//                   <textarea name="skills" placeholder="What skills can you teach or support with?" className="w-full border p-3 rounded-lg"></textarea>
//                   <button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-lg text-white font-semibold">Submit</button>
//                 </form>
//               </div>
//             )}

//             {modal === "donate" && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-4 text-orange-600">Support Our Mission</h2>
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleDonate(e.target.amount.value);
//                   }}
//                   className="space-y-4"
//                 >
//                   <input type="number" name="amount" placeholder="Enter amount (₦)" required className="w-full border p-3 rounded-lg" />
//                   <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 w-full py-3 rounded-lg text-white font-semibold">Donate via Flutterwave</button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import TrainingModal from "./modals/TrainingModal";
import VolunteerModal from "./modals/VolunteerModal";
import DonateModal from "./modals/DonateModal";
import Confetti from "react-confetti";
import toast from "react-hot-toast";

const SLIDES = [
  { src: "/hero1.jpg", title: "Tech4All by LALA TECH", subtitle: "Join the global mission to eradicate computer illiteracy." },
  { src: "/hero2.jpg", title: "Empower Your Community", subtitle: "Request free programs tailored to your people." },
  { src: "/hero3.jpg", title: "Learn Skills That Pay", subtitle: "From phone & laptop repairs to digital marketing." },
  { src: "/hero4.jpg", title: "Market Women Go Digital", subtitle: "Equip women with digital payment & selling skills." },
  { src: "/hero5.jpg", title: "Be Part of History", subtitle: "Volunteer, Donate, and Change the World." }
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (type, name) => {
    toast.success(
      `${type === "training" ? "Training request" : "Volunteer"} by ${name} received. Our team will reach out soon.`
    );
    setModal(null);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
  };

  const handleDonate = (amount) => {
    toast.success(`Redirecting to Flutterwave for ₦${amount} donation`);
    setModal(null);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
    window.location.href = "https://flutterwave.com/pay/demo"; // Replace with real link
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {confetti && <Confetti />}

      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={s.src} alt={s.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="max-w-3xl mx-auto text-center px-6 text-white">
              <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
                {s.title}
              </h2>
              <p className="mt-4 text-lg md:text-2xl drop-shadow">{s.subtitle}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setModal("training")}
                  className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
                >
                  Request Training
                </button>
                <button
                  onClick={() => setModal("volunteer")}
                  className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
                >
                  Volunteer
                </button>
                <button
                  onClick={() => setModal("donate")}
                  className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded-full font-semibold text-white shadow hover:scale-105 transition"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Orange Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-4 h-4 rounded-full transition ${
              i === index ? "bg-orange-500 scale-110" : "bg-white/60 hover:bg-orange-400"
            }`}
          ></button>
        ))}
      </div>

      {/* Modals */}
      {modal === "training" && (
        <TrainingModal onClose={() => setModal(null)} onSubmit={(name) => handleSubmit("training", name)} />
      )}
      {modal === "volunteer" && (
        <VolunteerModal onClose={() => setModal(null)} onSubmit={(name) => handleSubmit("volunteer", name)} />
      )}
      {modal === "donate" && (
        <DonateModal onClose={() => setModal(null)} onDonate={handleDonate} />
      )}
    </section>
  );
}
