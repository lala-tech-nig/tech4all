"use client";
import Modal from "./Modal";
import { useState } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function RequestModal({ programName, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, programName }),
      });

      if (response.ok) {
        onClose();
      }
    } catch (err) {
      console.error('Request error', err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Request Training: {programName}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
        />

        <textarea
          name="message"
          placeholder="Additional details (optional)"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 w-full py-3 rounded-lg text-white font-semibold shadow-lg transition active:scale-95"
        >
          Submit Request
        </button>
      </form>
    </Modal>
  );
}
