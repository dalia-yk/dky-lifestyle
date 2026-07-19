"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Formulaire soumis :", formData);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <h3 className="font-heading text-brand-ivory text-2xl mb-3">
          Merci pour ton message !
        </h3>
        <p className="font-sans text-brand-ivory/60 text-sm">
          Nous te répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="name"
          className="font-sans text-brand-ivory/70 text-sm mb-2 block"
        >
          Nom complet
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="font-sans text-brand-ivory/70 text-sm mb-2 block"
        >
          Adresse courriel
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-sans text-brand-ivory/70 text-sm mb-2 block"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors resize-none"
        />
      </div>

      <Button
        type="submit"
        className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 text-base"
      >
        Envoyer le message
      </Button>
    </form>
  );
}