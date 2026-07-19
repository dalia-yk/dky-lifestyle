import Link from "next/link";
import { Mail } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "TikTok", href: "https://tiktok.com", icon: FaTiktok },
  { label: "WhatsApp", href: "https://wa.me/", icon: FaWhatsapp },
];

const quickLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Galerie", href: "/galerie" },
  { label: "Réservation", href: "/reservation" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-ivory/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Bloc marque */}
        <div>
          <h3 className="font-heading text-brand-ivory text-2xl mb-3">
            DKY <span className="text-brand-champagne">Hair</span>
          </h3>
          <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed">
            Crafted by Purpose. L&apos;art de la coiffure, sublimé par le luxe
            et le raffinement.
          </p>
        </div>

        {/* Liens rapides */}
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

        {/* Réseaux sociaux + contact */}
        <div>
          <h4 className="font-sans uppercase tracking-widest text-brand-champagne text-xs mb-4">
            Suivez-nous
          </h4>
          <div className="flex gap-4 mb-6">
            {socialLinks.map((social) => (
                <a key={social.label}
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
        <p className="text-center font-sans text-brand-ivory/40 text-xs">
          © {new Date().getFullYear()} DKY Lifestyle. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}