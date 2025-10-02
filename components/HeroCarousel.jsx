"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import ReusableModal from "./ReusableModal";
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
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 10000); // ⏳ slower slide change
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (type, name) => {
    toast.success(
      `${type === "training" ? "Training request" : "Volunteer"} by ${name} received. Our team will reach out soon.`,
      { duration: 10000 } // ⏳ toast visible for 10s
    );
    setModal(null);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 10000); // 🎉 confetti lasts 10s
  };

  const handleDonate = (amount) => {
    toast.success(`Redirecting to Flutterwave for ₦${amount} donation`, { duration: 10000 });
    setModal(null);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 10000);
    window.location.href = "https://flutterwave.com/pay/demo"; // replace with real link
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
              {/* Title with typewriter */}
              <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg min-h-[4rem]">
                {i === index && (
                  <Typewriter
                    words={[s.title]}
                    loop={false}
                    cursor
                    cursorStyle="|"
                    typeSpeed={30}   // slower typing
                    deleteSpeed={15} // slower delete
                    delaySpeed={2500} // wait before switching
                  />
                )}
              </h2>

              {/* Subtitle with typewriter */}
              <p className="mt-4 text-lg md:text-2xl drop-shadow min-h-[2.5rem]">
                {i === index && (
                  <Typewriter
                    words={[s.subtitle]}
                    loop={false}
                    cursor
                    cursorStyle="|"
                    typeSpeed={25}
                    deleteSpeed={12}
                    delaySpeed={3000}
                  />
                )}
              </p>

              {/* Buttons */}
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

      {/* Reusable Modals */}
      <ReusableModal
        isOpen={modal === "training"}
        onClose={() => setModal(null)}
        title="Request Training"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit("training", e.target.name.value);
          }}
          className="space-y-4"
        >
          <select name="persona" required className="w-full border p-3 rounded-lg">
            <option value="">Who are you?</option>
            <option>Individual</option>
            <option>Organization</option>
            <option>Community</option>
          </select>
          <input type="text" name="name" placeholder="Name / Organization / Community" required className="w-full border p-3 rounded-lg" />
          <textarea name="details" placeholder="Tell us why you need this training" className="w-full border p-3 rounded-lg"></textarea>
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-lg text-white font-semibold">
            Submit
          </button>
        </form>
      </ReusableModal>

      <ReusableModal
        isOpen={modal === "volunteer"}
        onClose={() => setModal(null)}
        title="Volunteer With Us"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit("volunteer", e.target.name.value);
          }}
          className="space-y-4"
        >
          <input type="text" name="name" placeholder="Your Full Name" required className="w-full border p-3 rounded-lg" />
          <input type="email" name="email" placeholder="Your Email" required className="w-full border p-3 rounded-lg" />
          <textarea name="skills" placeholder="What skills can you teach or support with?" className="w-full border p-3 rounded-lg"></textarea>
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-lg text-white font-semibold">
            Submit
          </button>
        </form>
      </ReusableModal>

      <ReusableModal
        isOpen={modal === "donate"}
        onClose={() => setModal(null)}
        title="Support Our Mission"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDonate(e.target.amount.value);
          }}
          className="space-y-4"
        >
          <input type="number" name="amount" placeholder="Enter amount (₦)" required className="w-full border p-3 rounded-lg" />
          <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 w-full py-3 rounded-lg text-white font-semibold">
            Donate via Flutterwave
          </button>
        </form>
      </ReusableModal>
    </section>
  );
}
