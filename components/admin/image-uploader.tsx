"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string) => void;
  folder?: string;
}

export function ImageUploader({ value, onChange, folder = "dky-lifestyle" }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onChange(data.secure_url);
    } catch (error) {
      console.error("Erreur d'upload :", error);
      alert("Erreur lors de l'envoi de l'image.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-brand-champagne/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Aperçu" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-brand-black/80 text-brand-ivory rounded-full p-1.5 hover:bg-red-500/80 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-48 h-48 rounded-lg border-2 border-dashed border-brand-ivory/20 hover:border-brand-champagne/50 cursor-pointer transition-colors">
          <Upload size={24} className="text-brand-ivory/40 mb-2" />
          <span className="font-sans text-brand-ivory/50 text-xs">
            {isUploading ? "Envoi en cours..." : "Choisir une image"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}