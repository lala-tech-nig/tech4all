"use client";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Copy, Check, Landmark, User, Hash } from "lucide-react";
import toast from "react-hot-toast";

export default function DonateModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const accountNumber = "9668443029";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    toast.success("Account number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Landmark className="text-orange-600" size={32} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Direct Bank Transfer</h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">Your support fuels our mission to eradicate computer illiteracy.</p>
      </div>

      <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white rounded-lg shadow-sm">
                <Landmark size={18} className="text-gray-400" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Bank Name</p>
                <p className="font-bold text-gray-900">FCMB</p>
             </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white rounded-lg shadow-sm">
                <User size={18} className="text-gray-400" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account Name</p>
                <p className="font-bold text-gray-900">LALA TECH</p>
             </div>
          </div>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white rounded-lg shadow-sm">
                <Hash size={18} className="text-gray-400" />
             </div>
             <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account Number</p>
                <p className="font-mono text-2xl font-black text-orange-600 tracking-tighter">{accountNumber}</p>
             </div>
             <button 
                onClick={handleCopy}
                className={`p-3 rounded-xl transition-all active:scale-90 ${copied ? 'bg-emerald-500 text-white' : 'bg-white text-gray-400 hover:text-gray-900 shadow-sm border border-gray-100'}`}
             >
                {copied ? <Check size={20} /> : <Copy size={20} />}
             </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400 font-medium">Please send a screenshot of the transaction to <span className="text-orange-600 font-bold">@LALATECH</span> for confirmation.</p>
        <button 
          onClick={onClose}
          className="mt-6 w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition active:scale-[0.98] shadow-xl shadow-gray-900/10"
        >
          I've made the transfer
        </button>
      </div>
    </ModalWrapper>
  );
}
