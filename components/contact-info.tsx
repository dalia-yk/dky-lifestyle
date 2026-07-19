import { a } from "framer-motion/client";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";

interface ContactInfoProps {
  email: string;
  phone?: string;
  address?: string;
}

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "TikTok", href: "https://tiktok.com", icon: FaTiktok },
  { label: "WhatsApp", href: "https://wa.me/", icon: FaWhatsapp },
];

export function ContactInfo({ email, phone, address }: ContactInfoProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        
          <a href={`mailto:${email}`}
          className="flex items-center gap-3 font-sans text-brand-ivory/80 hover:text-brand-champagne text-sm transition-colors"
        >
          <Mail size={18} className="text-brand-champagne" />
          {email}
        </a>
        {phone && (
          
           <a href={`tel:${phone}`}
            className="flex items-center gap-3 font-sans text-brand-ivory/80 hover:text-brand-champagne text-sm transition-colors"
          >
            <Phone size={18} className="text-brand-champagne" />
            {phone}
          </a>
        )}
        {address && (
          <div className="flex items-center gap-3 font-sans text-brand-ivory/80 text-sm">
            <MapPin size={18} className="text-brand-champagne" />
            {address}
          </div>
        )}
      </div>

      <div>
        <p className="font-sans uppercase tracking-widest text-brand-champagne text-xs mb-4">
          Suivez-nous
        </p>
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
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
      </div>
    </div>
  );
}