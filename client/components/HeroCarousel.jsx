"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import ReusableModal from "./ReusableModal";
import DonateModal from "./modals/DonateModal";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/hero-slides`)
      .then(res => res.json())
      .then(data => setSlides(data))
      .catch(() => {
        setSlides([
          { src: "/hero1.jpg", title: "Tech4All by LALA TECH", subtitle: "Join the global mission to eradicate computer illiteracy." },
          { src: "/hero2.jpg", title: "Empower Your Community", subtitle: "Request free programs tailored to your people." },
          { src: "/hero3.jpg", title: "Learn Skills That Pay", subtitle: "From phone & laptop repairs to digital marketing." },
        ]);
      });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 10000);
    return () => clearInterval(t);
  }, [slides.length]);

  const handleSubmit = async (type, formEl) => {
    const name = formEl.name.value;
    const email = formEl.email?.value || '';
    const skills = formEl.skills?.value || '';
    const persona = formEl.persona?.value || '';
    const details = formEl.details?.value || '';

    try {
      if (type === 'volunteer') {
        await fetch(`${API_BASE_URL}/volunteers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, skills }),
        });
      } else if (type === 'training') {
        await fetch(`${API_BASE_URL}/requests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email: email || `${name.replace(/\s+/g,'').toLowerCase()}@request.com`, programName: persona || 'General Training', message: details }),
        });
      }
    } catch { /* silent fail */ }

    toast.success(
      `${type === "training" ? "Training request" : "Volunteer application"} by ${name} received! We'll reach out soon.`,
      { duration: 10000, style: { background: '#111', color: '#fff', borderRadius: '12px' } }
    );
    setModal(null);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 10000);
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {confetti && <Confetti numberOfPieces={200} recycle={false} style={{ zIndex: 100 }} />}

      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={s.src} alt={s.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="max-w-3xl mx-auto text-center px-6 text-white">
              <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg min-h-[4rem]">
                {i === index && (
                  <Typewriter
                    words={[s.title]}
                    loop={false}
                    cursor
                    cursorStyle="|"
                    typeSpeed={30}
                    deleteSpeed={15}
                    delaySpeed={2500}
                  />
                )}
              </h2>

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
                  className="group relative bg-white text-orange-600 px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2 overflow-hidden"
                >
                  <Heart size={18} className="group-hover:scale-125 transition-transform" />
                  <span>Donate</span>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-4 h-4 rounded-full transition ${
              i === index ? "bg-orange-500 scale-110" : "bg-white/60 hover:bg-orange-400"
            }`}
          ></button>
        ))}
      </div>

      <ReusableModal
        isOpen={modal === "training"}
        onClose={() => setModal(null)}
        title="Request Training"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit("training", e.target);
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
            handleSubmit("volunteer", e.target);
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

      {modal === "donate" && (
        <DonateModal onClose={() => setModal(null)} />
      )}
    </section>
  );
}
