"use client";
import { useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.admin));
        toast.success("Welcome back to Tech4All Dashboard!", {
           style: { background: '#111', color: '#fff', borderRadius: '12px' }
        });
        router.push("/admin");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Connection failed. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[450px] z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 backdrop-blur-md">
              <Image src="/tech4alllogonewnew.png" alt="Tech4All" width={140} height={56} className="object-contain" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            Administrator Gateway
          </h1>
          <p className="text-gray-400 font-medium">Please authenticate to continue to the dashboard.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" size={18} />
                <input
                  type="email"
                  required
                  placeholder="admin@tech4all.com.ng"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-12 py-4 text-white focus:bg-white/5 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-600 font-medium"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-12 py-4 text-white focus:bg-white/5 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-600 font-medium"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="relative w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-500/20 overflow-hidden group disabled:opacity-70 transition-all duration-300"
              >
                <div className="relative z-10 flex items-center justify-center gap-2 text-lg">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Secure Access</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
                {/* Button Shine Effect */}
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-1000 ease-in-out" />
              </motion.button>
            </div>
          </form>
          
          <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-4 text-gray-600">
             <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
               <ShieldCheck size={12} className="text-orange-500/50" />
               <span>256-bit encryption</span>
             </div>
             <div className="w-1 h-1 bg-white/10 rounded-full" />
             <div className="text-[10px] font-black uppercase tracking-widest">
               <span>Tech4All Core v2.0</span>
             </div>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Don't have access? <span className="text-gray-400 font-bold cursor-pointer hover:text-white transition">Contact System Admin</span>
        </p>
      </motion.div>
    </div>
  );
}
