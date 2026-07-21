"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

const lifestyleLinks = [
  { label: "Accueil", href: "/" },
  { label: "Nos divisions", href: "/#divisions" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const hairLinks = [
  { label: "Accueil", href: "/hair" },
  { label: "Services", href: "/hair/services" },
  { label: "Galerie", href: "/hair/galerie" },
  { label: "FAQ", href: "/hair/faq" },
  { label: "Contact", href: "/hair/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isHairSection = pathname.startsWith("/hair");
  const navLinks = isHairSection ? hairLinks : lifestyleLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-brand-ivory/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={isHairSection ? "/hair" : "/"}
          className="font-heading text-brand-ivory text-2xl"
        >
          DKY{" "}
          <span className="text-brand-champagne">
            {isHairSection ? "Hair" : "Lifestyle"}
          </span>
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
          {isHairSection && (
            <Link href="/hair/reservation">
              <Button className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full px-6">
                Réserver
              </Button>
            </Link>
          )}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="font-sans text-brand-ivory/80 hover:text-brand-champagne text-sm uppercase tracking-wide transition-colors">
                Connexion
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
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
          {isHairSection && (
            <Link href="/hair/reservation" onClick={() => setIsOpen(false)}>
              <Button className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full w-full">
                Réserver
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}