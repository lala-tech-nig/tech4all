"use client";
import ModalWrapper from "./ModalWrapper";

export default function TrainingModal({ onClose, onSubmit }) {
  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Request Training</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.target.name.value);
        }}
        className="space-y-4"
      >
        <select name="persona" required className="w-full border p-3 rounded-lg">
          <option value="">Who are you?</option>
          <option>Individual</option>
          <option>Organization</option>
          <option>Community</option>
        </select>
        <input
          type="text"
          name="name"
          placeholder="Name / Organization / Community"
          required
          className="w-full border p-3 rounded-lg"
        />
        <textarea
          name="details"
          placeholder="Tell us why you need this training"
          className="w-full border p-3 rounded-lg"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-lg text-white font-semibold"
        >
          Submit
        </button>
      </form>
    </ModalWrapper>
  );
}
