"use client";
import Modal from "./Modal";
import { useState } from "react";

export default function RequestModal({ program, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    persona: "",
    name: "",
    details: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, program }); // send back with program preselected
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Request Training: {program}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="persona"
          value={formData.persona}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        >
          <option value="">Who are you?</option>
          <option>Individual</option>
          <option>Organization</option>
          <option>Community</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Name / Organization / Community"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="details"
          placeholder="Tell us why you need this training"
          value={formData.details}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-lg text-white font-semibold shadow"
        >
          Submit Request
        </button>
      </form>
    </Modal>
  );
}
