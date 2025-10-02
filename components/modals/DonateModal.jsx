"use client";
import ModalWrapper from "./ModalWrapper";

export default function DonateModal({ onClose, onDonate }) {
  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Support Our Mission</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onDonate(e.target.amount.value);
        }}
        className="space-y-4"
      >
        <input
          type="number"
          name="amount"
          placeholder="Enter amount (₦)"
          required
          className="w-full border p-3 rounded-lg"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 w-full py-3 rounded-lg text-white font-semibold"
        >
          Donate via Flutterwave
        </button>
      </form>
    </ModalWrapper>
  );
}
