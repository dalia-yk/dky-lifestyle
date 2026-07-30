"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "TikTok", href: "https://tiktok.com", icon: FaTiktok },
  { label: "WhatsApp", href: "https://wa.me/", icon: FaWhatsapp },
];

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
  { label: "Réservation", href: "/hair/reservation" },
  { label: "Contact", href: "/hair/contact" },
];

export function Footer() {
  const pathname = usePathname();
  const isHairSection = pathname.startsWith("/hair");
  const quickLinks = isHairSection ? hairLinks : lifestyleLinks;

  return (
    <footer className="bg-brand-black border-t border-brand-ivory/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-heading text-brand-ivory text-2xl mb-3">
            DKY{" "}
            <span className="text-brand-champagne">
              {isHairSection ? "Hair" : "Lifestyle"}
            </span>
          </h3>
          <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed">
            {isHairSection
              ? "Crafted by Purpose. L'art de la coiffure, sublimé par le luxe et le raffinement."
              : "Une vision. Plusieurs expériences. Des possibilités infinies."}
          </p>
        </div>

        <div>
          <h4 className="font-sans uppercase tracking-widest text-brand-champagne text-xs mb-4">
            Navigation
          </h4>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-brand-ivory/70 hover:text-brand-champagne text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-sans uppercase tracking-widest text-brand-champagne text-xs mb-4">
            Suivez-nous
          </h4>
          <div className="flex gap-4 mb-6">
            {socialLinks.map((social) => (
              
             <a   key={social.label}
              href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-brand-ivory/70 hover:text-brand-champagne transition-colors"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          
           <a href="mailto:dkylifestyle@gmail.com"
            className="flex items-center gap-2 font-sans text-brand-ivory/70 hover:text-brand-champagne text-sm transition-colors"
          >
            <Mail size={16} />
            dkylifestyle@gmail.com
          </a>
        </div>
      </div>

      <div className="border-t border-brand-ivory/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <p className="font-sans text-brand-ivory/40 text-xs">
            © {new Date().getFullYear()} DKY Lifestyle. Tous droits réservés.
          </p>
          {isHairSection && (
            <>
              <span className="hidden sm:inline text-brand-ivory/20">•</span>
              <Link
                href="/hair/politique-reservation"
                className="font-sans text-brand-ivory/40 hover:text-brand-champagne text-xs transition-colors"
              >
                Politique de réservation
              </Link>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}