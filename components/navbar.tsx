"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Galerie", href: "/galerie" },
  { label: "Réservation", href: "/reservation" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-brand-ivory/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-heading text-brand-ivory text-2xl">
          DKY <span className="text-brand-champagne">Hair</span>
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-brand-ivory/80 hover:text-brand-champagne text-sm uppercase tracking-wide transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full px-6">
            Réserver
          </Button>
        </div>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden text-brand-ivory"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-sans text-brand-ivory/80 hover:text-brand-champagne text-sm uppercase tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Button className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full w-full">
            Réserver
          </Button>
        </div>
      )}
    </nav>
  );
}