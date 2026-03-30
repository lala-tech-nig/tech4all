"use client";
import ModalWrapper from "./ModalWrapper";

export default function VolunteerModal({ onClose, onSubmit }) {
  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Volunteer With Us</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.target.name.value);
        }}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          required
          className="w-full border p-3 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full border p-3 rounded-lg"
        />
        <textarea
          name="skills"
          placeholder="What skills can you teach or support with?"
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
