"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Scissors,
  ShoppingBag,
  Users,
  CreditCard,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";

const navSections = [
  {
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Hair",
    icon: Scissors,
    items: [
      { label: "Bookings", href: "/admin/hair/bookings" },
      { label: "Services", href: "/admin/hair/services" },
      { label: "Gallery", href: "/admin/hair/gallery" },
    ],
  },
  {
    title: "Shop",
    icon: ShoppingBag,
    items: [
      { label: "Products", href: "/admin/shop/products" },
      { label: "Orders", href: "/admin/shop/orders" },
    ],
  },
  {
    items: [
      { label: "Clients", href: "/admin/clients", icon: Users },
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      { label: "Calendar", href: "/admin/calendar", icon: Calendar },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-white/5 border-r border-brand-champagne/20 min-h-screen p-6 flex flex-col gap-8">
      <h2 className="font-heading text-brand-ivory text-xl">DKY Admin</h2>

      <nav className="flex flex-col gap-6">
        {navSections.map((section, i) => (
          <div key={i}>
            {section.title && (
              <p className="font-sans uppercase tracking-widest text-brand-champagne text-xs mb-3">
                {section.title}
              </p>
            )}
            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = "icon" in item ? item.icon : null;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-sans transition-colors ${
                      isActive
                        ? "bg-brand-champagne text-brand-black"
                        : "text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory"
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}